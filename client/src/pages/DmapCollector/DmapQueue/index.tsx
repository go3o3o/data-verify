import React, { useState, useEffect } from 'react';
import Async from 'react-async';
import axios from 'axios';
import moment from 'moment';

import DateFnsUtils from '@date-io/date-fns';

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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DmapStore from '~stores/dmap/DmapStore';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

function DmapQueue() {
  const [queue, setQueue] = useState({});
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState('');
  const [queueEndDt, setQueueEndDt] = useState('');
  const [queueStartDt, setQueueStartDt] = useState('');

  // msg 초기화
  useEffect(() => {
    setMsg('');
  });

  const deleteClick = (record: any) => {
    const seq = record.seq;
    const dmapStore = new DmapStore();
    dmapStore.deleteCrawlQueue(seq);
    message.success({ content: 'DELETE Queue Success!', key, duration: 2 });
    setTimeout(() => {
      setMsg('DELETE SUCCESS');
    }, 1000);
  };

  const editClick = (record: any) => {
    setQueue(record);
    setQueueStartDt(moment(record['start_dt']).format('YYYY-MM-DD'));
    setQueueEndDt(moment(record['end_dt']).format('YYYY-MM-DD'));
    setModal(!modal);
  };

  const key = 'updatable';
  if (msg === 'INSERT SUCCESS') {
  } else if (msg === 'INSERT ERROR') {
    setTimeout(() => {
      setMsg('');
    }, 2000);
  } else if (msg === 'DELETE SUCCESS') {
  }

  const crawlStartClick = (record: any) => {
    const seq = record.seq;
    // console.log(seq);

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
    // INSERT 하는데 대략 (일자 수 / 10) 초가 걸림
    const delay = Math.ceil((endDt - startDt) / 10);
    const url = 'http://211.39.140.72:8282/crawl';

    axios
      .post(url, { params: { seq: seq } })
      .then(res => {
        // console.log(res.data.Result);
        if (res.data.Result === 'SUCCESS') {
          message.success({
            content: 'Insert Queue Success!',
            key,
            duration: 1,
          });
          setTimeout(() => {
            setMsg('INSERT SUCCESS');
          }, 1000);
        } else if (res.data.Result === 'ERROR') {
          message.error({ content: 'Insert Queue Fail!', key, duration: 1 });
          setTimeout(() => {
            setMsg('INSERT ERROR');
          }, 1000);
        }
      })
      .catch(e => {
        message.error({ content: 'Insert Queue Fail!', key, duration: 1 });
        setTimeout(() => {
          setMsg('INSERT ERROR');
        }, 1000);
      });
    message.loading({
      content: 'Inserting. Wait....',
      key,
      duration: delay,
    });
  };

  const handleOk = () => {
    queue['start_dt'] = moment(queueStartDt).format('YYYYMMDD');
    queue['end_dt'] = moment(queueEndDt).format('YYYYMMDD');

    // update queue
    var dmapStore = new DmapStore();
    dmapStore.updateCrawlQueue(queue);

    setModal(!modal);
  };

  const handleCancel = () => {
    setModal(!modal);
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

  const handleStartDtChange = (
    date: MaterialUiPickersDate,
    value?: string | null,
  ) => {
    if (value !== null) {
      const start_dt = moment(value).format('YYYYMMDD');
      setQueueStartDt(value);
    }
  };
  const handleEndDtChange = (
    date: MaterialUiPickersDate,
    value?: string | null,
  ) => {
    if (value !== null) {
      const end_dt = moment(value).format('YYYYMMDD');
      setQueueEndDt(value);
    }
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
        bodyStyle={{ textAlign: 'center' }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="수집시작일"
            value={queueStartDt}
            onChange={handleStartDtChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="수집종료일"
            value={queueEndDt}
            onChange={handleEndDtChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Modal>
    </>
  );
}

export default DmapQueue;
