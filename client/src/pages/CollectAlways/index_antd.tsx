import React, { Component, MouseEvent } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import VerifyStore from '~stores/verify/VerifyStore';
import { RouteComponentProps } from 'react-router';

type InjectedProps = {
  [STORES.VERIFY_STORE]: VerifyStore;
} & RouteComponentProps<{
  customerId: string;
  collectType: string;
  docDatetime: string;
}>;

class CollectAlways_antd extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount(): void {
    const customerId = this.props.match.params.customerId;
    const collectType = this.props.match.params.collectType;
    const docDatetime = this.props.match.params.docDatetime;

    if (
      customerId !== undefined ||
      collectType !== undefined ||
      docDatetime !== undefined
    ) {
      this.props[STORES.VERIFY_STORE].searchAlwaysData(
        customerId,
        collectType,
        docDatetime,
      );
    } else {
      this.props[STORES.VERIFY_STORE].alwaysData();
    }
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu>
    );
    const expandedRowRender = () => {
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Status',
          key: 'state',
          render: () => (
            <span>
              <Badge status="success" />
              Finished
            </span>
          ),
        },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <span className="table-operation">
              <a>Pause</a>
              <a>Stop</a>
              <Dropdown overlay={menu}>
                <a>
                  More <Icon type="down" />
                </a>
              </Dropdown>
            </span>
          ),
        },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Platform', dataIndex: 'platform', key: 'platform' },
      { title: 'Version', dataIndex: 'version', key: 'version' },
      { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
      { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }

    return (
      <>
        <MenuBar subMenu="" />
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '90%', display: 'inline-block' }}>
            <Form style={{ padding: 30 }}>
              <Row form>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>고객명</InputGroupText>
                    </InputGroupAddon>
                    <Input type="select" name="customerId" id="customerId" />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>수집방법</InputGroupText>
                    </InputGroupAddon>
                    <Input type="select" name="collectType" id="collectType" />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>수집일자</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <FormGroup check row>
                  <Col>
                    <Button>검색</Button>
                  </Col>
                </FormGroup>
              </Row>
            </Form>
            <Table
              className="components-table-demo-nested"
              columns={columns}
              expandedRowRender={expandedRowRender}
              dataSource={data}
            />
          </div>
        </div>
      </>
    );
  }
}

export default inject(STORES.VERIFY_STORE)(observer(CollectAlways_antd));
