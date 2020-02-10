import React, { Component } from 'react';
import Async from 'react-async';
import { inject, observer } from 'mobx-react';

import { Table, Form, Spin, Button, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';

import { STORES } from '~constants';

import VerifyStore from '~stores/verify/VerifyStore';

import MenuBar from '~components/MenuBar';
import { FilterCustomer } from './FilterCustomer';
import { FilterCollectType } from './FilterCollectType';
import { FilterDocDatetime } from './FilterDocDatetime';

type InjectedProps = {
  [STORES.VERIFY_STORE]: VerifyStore;
};

class CollectAlways extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);
    this.state = { alwaysData: undefined, visible: false, viewData: undefined };
    this.props[STORES.VERIFY_STORE].alwaysData();

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.loadAlwaysData = this.loadAlwaysData.bind(this);
    this.loadAlwaysDetailData = this.loadAlwaysDetailData.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = e => {
    this.setState({ visible: false });
  };
  handleCancel = e => {
    this.setState({ visible: false });
  };

  loadAlwaysData(data): object[] {
    if (this.state['alwaysData'] === undefined) {
      data.map(d => {
        d['filterCustomer'] = true;
        d['filterCollectType'] = true;
        d['filterDocDatetime'] = true;
        if (d.collect_type == 0) {
          d['collect_type_nm'] = '디맵수집기';
        }
        if (d.collect_type == 1) {
          d['collect_type_nm'] = '신규수집기';
        }
      });
      return data;
    }
    return this.state['alwaysData'];
  }

  loadAlwaysDetailData = (customer_id: string, channel: string) => {
    return this.props[STORES.VERIFY_STORE]
      .alwaysDetailData(customer_id, channel)
      .then(res => {
        return res.data;
      });
  };

  handleFilter = (name, column, value, data) => {
    var alwaysData: object[] = [];
    if (value === 'all') {
      alwaysData = data.filter(d => {
        d[name] = true;
        return (
          d['filterCustomer'] === true &&
          d['filterCollectType'] === true &&
          d['filterDocDatetime'] === true
        );
      });
    } else {
      alwaysData = data.filter(d => {
        if (d[column] === value) {
          d[name] = true;
        } else {
          d[name] = false;
        }
        return (
          d['filterCustomer'] === true &&
          d['filterCollectType'] === true &&
          d['filterDocDatetime'] === true
        );
      });
    }
    this.setState({ alwaysData: alwaysData });
  };

  render() {
    var { data } = this.props[STORES.VERIFY_STORE];
    var { customers } = this.props[STORES.VERIFY_STORE];

    const expandedRowRender = (e: any) => {
      const customer_id = e.customer_id;
      const channel = e.channel;

      const columns = [
        {
          title: '수집일자',
          dataIndex: 'doc_datetime',
          key: 'doc_datetime',
          ellipsis: true,
        },
        {
          title: '수집채널',
          dataIndex: 'channel',
          key: 'channel',
          ellipsis: true,
        },
        {
          title: '제목',
          dataIndex: 'doc_title',
          key: 'doc_title',
          ellipsis: true,
        },
        {
          title: '내용',
          dataIndex: 'doc_content',
          key: 'doc_content',
          ellipsis: true,
        },
        { title: 'URL', dataIndex: 'doc_url', key: 'doc_url', ellipsis: true },
        {
          title: '첨부여부',
          dataIndex: 'attach_yn',
          key: 'attach_yn',
          ellipsis: true,
        },
        { title: '상세보기', dataIndex: 'detail', key: 'detail' },
      ];

      const onClick = data => {
        this.setState({ viewData: data });
        this.showModal();
      };

      return (
        <Async promise={this.loadAlwaysDetailData(customer_id, channel)}>
          <Async.Loading>
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <Spin size="large" />
            </div>
          </Async.Loading>
          <Async.Resolved>
            {data => {
              data['data'].map(d => {
                d['detail'] = (
                  <>
                    <Button
                      type="link"
                      shape="circle"
                      size="large"
                      icon="file"
                      onClick={() => onClick(d)}
                    />
                  </>
                );
              });

              return <Table columns={columns} dataSource={data['data']} />;
            }}
          </Async.Resolved>
        </Async>
      );
    };

    const columns = [
      {
        title: '고객명',
        dataIndex: 'customer_id',
        key: 'customer_id',
        width: '20%',
      },
      { title: '수집채널', dataIndex: 'channel', key: 'channel', width: '60%' },
      {
        title: '수집방법',
        dataIndex: 'collect_type_nm',
        key: 'collect_type_nm',
        width: '20%',
      },
    ];

    return (
      <>
        <MenuBar subMenu="" />
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '90%', display: 'inline-block', marginTop: 40 }}>
            <Form
              layout="inline"
              style={{ textAlign: 'left', marginBottom: 30 }}
            >
              <Form.Item>
                <FilterCustomer
                  filterBy={this.handleFilter}
                  data={data}
                  customers={customers}
                />
              </Form.Item>
              <Form.Item>
                <FilterCollectType filterBy={this.handleFilter} data={data} />
              </Form.Item>
              <Form.Item>
                {/* <FilterDocDatetime
                  filterBy={this.handleFilter}
                  data={data}
                /> */}
              </Form.Item>
            </Form>

            <Table
              className="components-table-demo-nested"
              columns={columns}
              dataSource={this.loadAlwaysData(data)}
              expandedRowRender={expandedRowRender}
            />
            <Modal
              title={
                this.state['visible'] ? (
                  <p>
                    {`${this.state['viewData'].customer_id} >
                      ${this.state['viewData'].channel}`}
                  </p>
                ) : (
                  <p>No Data</p>
                )
              }
              visible={this.state['visible']}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {this.state['visible'] ? (
                <p>{this.state['viewData'].doc_content}</p>
              ) : (
                <p>No Data</p>
              )}
            </Modal>
          </div>
        </div>
      </>
    );
  }
}

export default inject(STORES.VERIFY_STORE)(observer(CollectAlways));
