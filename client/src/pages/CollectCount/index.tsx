import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
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
import { Card } from 'antd';

import { STORES } from '~constants';

import VerifyStore from '~stores/verify/VerifyStore';
import MenuBar from '~components/MenuBar';
import DetailCount from './DetailCount';

type InjectedProps = {
  [STORES.VERIFY_STORE]: VerifyStore;
} & RouteComponentProps<{
  customer_id: string;
}>;

class CollectCount extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = { modal: false, customer_id: '', always_yn: '' };

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

    return (
      <>
        <MenuBar subMenu="" />
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginTop: 40 }}>
            <Toast
              fade={false}
              style={{
                textAlign: 'left',
                minWidth: '95%',
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
                textAlign: 'left',
                minWidth: '95%',
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
          </div>
        </div>
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
            <DetailCount
              verifyStore={this.props[STORES.VERIFY_STORE]}
              customer_id={this.state['customer_id']}
              always_yn={this.state['always_yn']}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{' '}
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
