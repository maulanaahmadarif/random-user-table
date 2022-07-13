import { Col, Row, Divider } from 'antd'

import FilterForm from './components/FilterForm';
import UserTable from './components/UserTable';

function App() {
  return (
    <div className="main">
      <div className="container">
        <Row>
          <h1>Random User Table</h1>
        </Row>
        <Row>
          <Col>
            <FilterForm />
          </Col>
        </Row>
        <Divider />
        <Row className="table-wrapper">
          <Col span={24}>
            <UserTable />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
