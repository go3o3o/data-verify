import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Async from 'react-async';
import {
  Toast,
  ToastHeader,
  ToastBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Layout, Spin } from 'antd';

import { STORES } from '~constants';

import VerifyStore from '~stores/verify/VerifyStore';
import SideBar from '~components/SideBar';
import DetailCount from './DetailCount';

type InjectedProps = {
  [STORES.VERIFY_STORE]: VerifyStore;
} & RouteComponentProps<{
  customer_id: string;
  collapsed: string;
}>;

const { Content } = Layout;

class CollectCount extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
      customer_id: '',
      always_yn: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(): void {
    this.props[STORES.VERIFY_STORE].countData();
  }

  toggle = (e: any) => {
    this.setState({ modal: !this.state['modal'] });
    if (!this.state['modal']) {
      this.setState({
        customer_id: e.target.value,
        always_yn: e.target.getAttribute('value2'),
      });
    }
  };

  loadCountDataByCustomerId = () => {
    return this.props[STORES.VERIFY_STORE]
      .countDataByCustomerId(this.state['customer_id'], this.state['always_yn'])
      .then(res => {
        return res.data;
      });
  };

  closeBtn = (
    <button className="close" onClick={this.toggle}>
      &times;
    </button>
  );

  render() {
    const { count } = this.props[STORES.VERIFY_STORE];
    const alwaysCount: any[] = [];
    const retroactiveCount: any[] = [];
    count.map(c => {
      if (c.always_yn === 'Y') {
        alwaysCount.push(c);
      } else {
        retroactiveCount.push(c);
      }
    });

    const collapsed = this.props.match.params.collapsed;

    return (
      <>
        <Layout style={{ height: '100vh' }}>
          <SideBar selectedKeys="count" openKeys="" collapsed={collapsed} />
          <Layout style={{ background: '#051428' }}>
            <Content style={{ margin: '24px 16px 0', textAlign: 'center' }}>
              <Toast
                fade={false}
                style={{
                  background: '#FFF',
                  textAlign: 'left',
                  minWidth: '100%',
                  display: 'inline-block',
                  marginBottom: 30,
                }}
              >
                <ToastHeader
                  style={{
                    fontSize: 18,
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  상시수집 건수
                </ToastHeader>
                <ToastBody>
                  {alwaysCount.map(v => (
                    <>
                      <Button
                        outline
                        color="secondary"
                        size="lg"
                        onClick={this.toggle}
                        value={v.customer_id}
                        value2="Y"
                        style={{ margin: '10px' }}
                      >
                        {v.customer_id}
                      </Button>
                    </>
                  ))}
                </ToastBody>
              </Toast>
              <Toast
                fade={false}
                style={{
                  background: '#FFF',
                  textAlign: 'left',
                  minWidth: '100%',
                  display: 'inline-block',
                }}
              >
                <ToastHeader
                  style={{
                    fontSize: 18,
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  소급수집 건수
                </ToastHeader>
                <ToastBody>
                  {retroactiveCount.map(v => (
                    <>
                      <Button
                        outline
                        color="secondary"
                        size="lg"
                        onClick={this.toggle}
                        value={v.customer_id}
                        value2="N"
                        style={{ margin: '10px' }}
                      >
                        {v.customer_id}
                      </Button>
                    </>
                  ))}
                </ToastBody>
              </Toast>
              {/* </div> */}
            </Content>
          </Layout>
        </Layout>
        <Modal
          isOpen={this.state['modal']}
          toggle={this.toggle}
          fade={false}
          style={{ minWidth: '80%' }}
        >
          <ModalHeader toggle={this.toggle} close={this.closeBtn}>
            {this.state['customer_id']} 수집 건수
          </ModalHeader>
          <ModalBody>
            <Async promiseFn={this.loadCountDataByCustomerId}>
              <Async.Loading>
                <Spin size="large" />
              </Async.Loading>
              <Async.Resolved>
                {data => {
                  return (
                    <DetailCount
                      countDataByCustomerId={data['data']}
                      always_yn={this.state['always_yn']}
                    />
                  );
                }}
              </Async.Resolved>
            </Async>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default inject(STORES.VERIFY_STORE)(observer(CollectCount));
