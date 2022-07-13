import React, { useContext, useRef, useEffect } from 'react'
import { Input, Space, Button, Select } from 'antd'
import debounce from 'lodash/debounce'

import { Context } from '../store'

const { Search } = Input;
const { Option } = Select;

const FilterForm = () => {
  const [state, dispatch] = useContext(Context);
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value)
    setSearchValue(e.target.value)
  }

  const debouncedSearch = useRef(
    debounce(async (value) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: value })
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const resetFilter = () => {
    dispatch({ type: 'SET_GENDER', payload: '' })
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })
    setSearchValue('')
  }

  return (
    <div>
      <Space align="end" className="input-wrapper">
        <Space direction="vertical">
          <label>Search</label>
          <Search value={searchValue} placeholder="input search text" onChange={handleSearchChange} enterButton />
        </Space>
        <Space direction="vertical">
          <label>Gender</label>
          <Select value={state.gender} style={{ width: 150 }} onChange={(value) => dispatch({ type: 'SET_GENDER', payload: value })}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Space>
        <Button onClick={resetFilter}>Reset Filter</Button>
      </Space>
    </div>
  )
}

export default FilterForm