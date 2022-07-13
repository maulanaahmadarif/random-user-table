import React, { useEffect, useState, useContext } from 'react'
import { Table, message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import { Context } from '../store'

const UserTable = () => {
  const [userData, setUserData] = useState([])
  const [tempData, setTempData] = useState([])
  const [fetching, setFetching] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [state] = useContext(Context);

  useEffect(() => {
    const searchQueryFiltered = tempData.filter((data) => {
      if (state.gender && state.searchQuery) {
        return data.gender === state.gender && data.username.includes(state.searchQuery)
      } else if (state.gender) {
        return data.gender === state.gender
      } else if (state.searchQuery) {
        return data.username.includes(state.searchQuery)
      }
      return true
    })

    setUserData(searchQueryFiltered)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.gender, state.searchQuery])

  useEffect(() => {
    fetchData(pagination);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Registered Date',
      dataIndex: 'registeredDate',
      sorter: (a, b) => a.registeredDate.localeCompare(b.registeredDate),
      render: (registeredDate) => moment(registeredDate).format('DD MMM YYYY hh:ss A'),
    },
  ];
  
  const getParams = (params) => ({
    results: params.pageSize,
    page: params.current,
    inc: 'gender,name,login,registered,email',
    ...params
  });

  const fetchData = async (params) => {
    try {
      setFetching(true)

      const userData = await axios.get(`https://randomuser.me/api/?${qs.stringify(getParams(params))}`)
    
      if (userData.data) {
        const normalizeData = userData.data.results.map((result) => {
          return {
            username: result.login.username,
            name: `${result.name.first} ${result.name.last}`,
            email: result.email,
            gender: result.gender,
            registeredDate: result.registered.date
          }
        })

        setUserData(normalizeData)
        setTempData(normalizeData)
        setPagination({
          current: params.current,
          pageSize: params.pageSize,
          total: 200,
        });
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setFetching(false)
    }
  }

  const handleTableChange = (newPagination, filters, sorter) => {
    if (newPagination.current === pagination.current) {
      return
    }
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      results: newPagination.pageSize,
      page: newPagination.current,
      ...newPagination,
      ...filters,
    });
  };

  return (
    <div>
      <Table
        pagination={pagination}
        loading={fetching}
        rowKey={(record) => record.username}
        columns={columns} dataSource={userData}
        onChange={handleTableChange} />
    </div>
  )
}

export default UserTable