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

import 'antd/dist/antd.css';

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
    this.state = { modal: false, customer_id: '' };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(): void {
    this.props[STORES.VERIFY_STORE].countData();
  }

  toggle = (e: any) => {
    this.setState({ modal: !this.state['modal'] });
    if (!this.state['modal']) {
      this.setState({ customer_id: e.target.value });
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
        <div style={{ padding: '20px' }}>
          <Toast
            fade={false}
            style={{ minWidth: '100%', display: 'inline-block' }}
          >
            <ToastHeader style={{ fontSize: '1.2em' }}>
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
                    style={{ margin: '10px' }}
                  >
                    {v.customer_id}
                  </Button>
                </>
              ))}
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
                    always_yn="Y"
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
            </ToastBody>
          </Toast>
        </div>
        <div style={{ padding: '20px' }}>
          <Toast
            fade={false}
            style={{ minWidth: '100%', display: 'inline-block' }}
          >
            <ToastHeader style={{ fontSize: '1.2em' }}>
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
                    style={{ margin: '10px' }}
                  >
                    {v.customer_id}
                  </Button>
                </>
              ))}
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
                    always_yn="N"
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
            </ToastBody>
          </Toast>
        </div>
      </>
    );
  }
}

export default inject(STORES.VERIFY_STORE)(observer(CollectCount));
