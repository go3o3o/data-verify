import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { STORES } from '~constants';
import VerifyStore from '~stores/verify/VerifyStore';

type InjectedProps = {
  verifyStore: VerifyStore;
  customer_id: string;
  channel: string;
};

function DetailAlways(props: InjectedProps) {
  useEffect(() => {
    props.verifyStore.setCustomerId(props.customer_id);
    props.verifyStore.setChannel(props.channel);
    props.verifyStore.alwaysDetailData();
  }, []);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const columns = [
    { title: '수집일자', dataIndex: 'doc_datetime', key: 'doc_datetime' },
    { title: '수집채널', dataIndex: 'channel', key: 'channel' },
    { title: '제목', dataIndex: 'doc_title', key: 'doc_title' },
    { title: '내용', dataIndex: 'doc_content', key: 'doc_content' },
    { title: 'URL', dataIndex: 'doc_url', key: 'doc_url' },
    { title: '첨부여부', dataIndex: 'attach_yn', key: 'attach_yn' },
    { title: '상세보기', dataIndex: 'detail', key: 'detail' },
  ];

  const detailButton = (
    <>
      <Button onClick={toggle}>detail</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>띠용</ModalHeader>
        <ModalBody>띠!용!</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );

  const { detailData } = props.verifyStore;
  detailData.map(d => {
    d.channel = d.channel.substring(0, 20);
    d.doc_title = d.doc_title.substring(0, 20);
    d.doc_content = d.doc_content.substring(0, 20);
    d.doc_url = d.doc_url.substring(0, 20);

    d['detail'] = detailButton;
  });

  return <Table columns={columns} dataSource={detailData} pagination={false} />;
}

export default inject(STORES.VERIFY_STORE)(observer(DetailAlways));
