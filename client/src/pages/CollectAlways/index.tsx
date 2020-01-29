import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import VerifyStore from '~stores/verify/VerifyStore';
import DetailAlways from '~pages/CollectAlways/DetailAlways';

type InjectedProps = {
  [STORES.VERIFY_STORE]: VerifyStore;
} & RouteComponentProps<{
  customer_id: string;
  collect_type: string;
  doc_datetime: string;
}>;

class CollectAlways extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount(): void {
    const customerId = this.props.match.params.customer_id;
    const collectType = this.props.match.params.collect_type;
    const docDatetime = this.props.match.params.doc_datetime;

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
    const columns = [
      { title: '고객명', dataIndex: 'customer_id', key: 'customer_id' },
      { title: '수집채널', dataIndex: 'channel', key: 'channel' },
      {
        title: '수집방법',
        dataIndex: 'collect_type_nm',
        key: 'collect_type_nm',
      },
    ];

    const { data } = this.props[STORES.VERIFY_STORE];
    data.map(d => {
      if (d.collect_type == 0) {
        d['collect_type_nm'] = '디맵수집기';
      }
      if (d.collect_type == 1) {
        d['collect_type_nm'] = '신규수집기';
      }
    });

    const { verifyStore } = this.props;

    const expandedRowRender = (e: any) => {
      console.log('expandedRowRender');

      const customer_id = e.customer_id;
      const channel = e.channel;

      // ️verifyStore에 변수 대입 먼저 해준 후에 <DetailAlways> 호출⭐️
      verifyStore.setCustomerId(customer_id);
      verifyStore.setChannel(channel);
      verifyStore.alwaysDetailData();

      return (
        <DetailAlways
          verifyStore={verifyStore}
          customer_id={customer_id}
          channel={channel}
        />
      );
    };

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

export default inject(STORES.VERIFY_STORE)(observer(CollectAlways));
