import React, { Component, useState } from 'react';
import Async from 'react-async';
import axios from 'axios';
import moment from 'moment';

import {
  message,
  Table,
  Spin,
  Icon,
  Divider,
  Popconfirm,
  Tooltip,
  Modal,
} from 'antd';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DmapStore from '~stores/dmap/DmapStore';

function DmapQueue() {
  const [queue, setQueue] = useState({});
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState('');
  const [age, setAge] = React.useState('');

  const deleteClick = (record: any) => {
    const seq = record.seq;
    const dmapStore = new DmapStore();
    dmapStore.deleteCrawlQueue(seq);
    message.success('Delete Queue Success');
  };

  const editClick = (record: any) => {
    setQueue(record);
    setModal(!modal);
  };

  const key = 'updatable';
  if (msg === 'SUCCESS') {
    message.success({ content: 'Insert Queue Success!', key, duration: 1 });
  }

  const crawlStartClick = (record: any) => {
    const seq = record.seq;
    // 수집시작일과 수집종료일 사이의 일자 수 구하기
    const startDt =
      new Date(moment(record.start_dt).format('YYYY-MM-DD')).getTime() /
      1000 /
      60 /
      60 /
      24;
    const endDt =
      new Date(moment(record.end_dt).format('YYYY-MM-DD')).getTime() /
      1000 /
      60 /
      60 /
      24;
    // INSERT 하는데 대략 (일자 수 / 10) 정도의 초가 걸림
    const delay = Math.ceil((endDt - startDt) / 10);
    axios
      .get('http://localhost:8282/crawl', {
        params: {
          seq: seq,
        },
      })
      .then(res => {
        console.log(res.data.Result);
        setMsg(res.data.Result);
      });
    message.loading({
      content: 'Inserting. Wait....',
      key,
      duration: delay,
    });
  };

  const handleOk = () => {
    var dmapStore = new DmapStore();
    // update queue

    setModal(!modal);
  };

  const handleCancel = () => {
    setModal(!modal);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const columns = [
    { title: 'seq', dataIndex: 'seq', key: 'seq' },
    { title: '프로젝트명', dataIndex: 'name', key: 'name' },

    { title: '채널1', dataIndex: 'depth1_seq', key: 'depth1_seq' },
    { title: '채널2', dataIndex: 'depth2_seq', key: 'depth2_seq' },
    { title: '채널3', dataIndex: 'depth3_seq', key: 'depth3_seq' },
    { title: '수집시작일', dataIndex: 'start_dt', key: 'start_dt' },
    { title: '수집종료일', dataIndex: 'end_dt', key: 'end_dt' },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <a onClick={() => editClick(record)}>
            <Icon
              type="edit"
              theme="twoTone"
              twoToneColor="#52c41a"
              style={{ verticalAlign: 'middle' }}
            />
          </a>

          <Divider type="vertical" />
          <Tooltip title="수집 시작 버튼">
            <a onClick={() => crawlStartClick(record)}>
              <Icon
                type="bug"
                theme="twoTone"
                style={{ verticalAlign: 'middle' }}
              />
            </a>
          </Tooltip>

          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure?"
            icon={
              <Icon
                type="question-circle-o"
                style={{ color: 'red', verticalAlign: 'middle' }}
              />
            }
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteClick(record)}
          >
            <a>
              <Icon
                type="delete"
                theme="twoTone"
                twoToneColor="#6D6D6D"
                style={{ verticalAlign: 'middle' }}
              />
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const loadCrawlQueueData = () => {
    const dmapStore = new DmapStore();
    return dmapStore.crawlQueueData().then(res => {
      // console.log(res['crawlQueueData'].data.data);
      // console.log(res['source'].data.data);
      return res['crawlQueueData'].data.data;
    });
  };

  return (
    <>
      <Async promiseFn={loadCrawlQueueData}>
        <Async.Loading>
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <Spin size="large" />
          </div>
        </Async.Loading>
        <Async.Resolved>
          {(data: any[]) => {
            return <Table columns={columns} dataSource={data} />;
          }}
        </Async.Resolved>
      </Async>
      <Modal
        // title="Basic Modal"
        okText="Save"
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Modal>
    </>
  );
}

export default DmapQueue;
