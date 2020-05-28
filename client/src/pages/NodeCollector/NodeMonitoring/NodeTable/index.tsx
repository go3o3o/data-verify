// import 'date-fns';
import React, { useState } from 'react';
import Async from 'react-async';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

import { message, Table, Spin, Divider, Icon, Popconfirm, Modal } from 'antd';
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { StatusTag } from './statusTag';
import NodeStore from '~stores/node/NodeStore';

const NodeTable = ({ eventsData }: { eventsData: any }) => {
  const [visible, setVisiale] = useState(false);
  const [request, setRequest] = useState({});
  const [requestKeyword, setRequestKeyword] = useState('');
  const [requestStartDt, setRequestStartDt] = useState('');
  const [requestEndDt, setRequestEndDt] = useState('');
  const [requestStatus, setRequestStatus] = useState('');

  const deleteRequestClick = (record: any) => {
    const nodeStore = new NodeStore();
    nodeStore.deleteRequest(record.seq);
    window.location.reload();
  };

  const deleteProgressClick = (record: any) => {
    const nodeStore = new NodeStore();
    nodeStore.deleteProgress(record.seq);
    window.location.reload();
  };

  const editRequestClick = (record: any) => {
    setRequest(record);
    setRequestKeyword(record['keyword']);
    setRequestStartDt(record['start_dt']);
    setRequestEndDt(record['end_dt']);
    setRequestStatus(record['status']);
    setVisiale(!visible);
  };

  const key = 'updatable';
  const handleModalOk = (e: any) => {
    const nodeStore = new NodeStore();
    nodeStore.updateRequest({
      seq: request['seq'],
      keyword: requestKeyword,
      start_dt: requestStartDt,
      end_dt: requestEndDt,
      status: requestStatus,
    });
    // setVisiale(!visible);
    window.location.reload();
  };

  const handleModalCancel = (e: any) => {
    setVisiale(!visible);
  };

  const tableColumns = [
    {
      title: '번호',
      dataIndex: 'seq',
      key: 'seq',
    },
    {
      title: '고객',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: '채널',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '주기',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '시작일',
      dataIndex: 'start_dt',
      key: 'start_dt',
    },
    {
      title: '종료일',
      dataIndex: 'end_dt',
      key: 'end_dt',
    },
    {
      title: '키워드',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (record: any) => <StatusTag table="request" status={record} />,
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <span>
            <a onClick={() => editRequestClick(record)}>
              <Icon
                type="edit"
                theme="twoTone"
                twoToneColor="#52c41a"
                style={{ verticalAlign: 'middle' }}
              />
            </a>
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
              onConfirm={() => deleteRequestClick(record)}
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
        </>
      ),
    },
  ];

  const loadNodeDetailData = (request_seq: number) => {
    const nodeStore = new NodeStore();
    return nodeStore.nodeDetailData(request_seq).then(res => {
      return res.data;
    });
  };

  const expandedRowRender = (e: any) => {
    const request_seq = e.seq;
    const columns = [
      {
        title: 'seq',
        dataIndex: 'seq',
        key: 'seq',
        width: '10%',
      },
      {
        title: '시작일',
        dataIndex: 'start_dt',
        key: 'start_dt',
        width: '15%',
      },
      {
        title: '종료일',
        dataIndex: 'end_dt',
        key: 'end_dt',
        width: '15%',
      },
      {
        title: '상태',
        key: 'status',
        width: '15%',
        filters: [
          { text: 'working', value: 'Request' },
          { text: 'complete', value: 'Finished' },
          { text: 'error', value: 'Error' },
        ],
        onFilter: (value: any, record: any) => record.status.includes(value),
        render: (record: any) => (
          <StatusTag table="progress" status={record.status} />
        ),
      },
      {
        title: '에러메시지',
        dataIndex: 'error_msg',
        key: 'error_msg',
        width: '40%',
      },
      {
        title: 'ON',
        dataIndex: 'on_going_flag',
        key: 'on_going_flag',
        render: text => {
          if (text === 'Y') {
            return (
              <span style={{ color: 'black', fontWeight: 'bold' }}>{text}</span>
            );
          } else {
            return <span style={{ color: '#DBDBDB' }}>{text}</span>;
          }
        },
      },
      {
        title: '',
        key: 'action',
        render: (text: any, record: any) => (
          <span>
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
              onConfirm={() => deleteProgressClick(record)}
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

    return (
      <>
        <Async promise={loadNodeDetailData(request_seq)}>
          <Async.Loading>
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <Spin size="large" />
            </div>
          </Async.Loading>
          <Async.Resolved>
            {data => {
              return (
                <Table
                  size="small"
                  columns={columns}
                  dataSource={data['data']}
                />
              );
            }}
          </Async.Resolved>
        </Async>
      </>
    );
  };

  const handleStartDtChange = (date: Date | null) => {
    if (date !== null) {
      const start_dt = moment(date).format('YYYY-MM-DD');
      setRequestStartDt(start_dt);
    }
  };
  const handleEndDtChange = (date: Date | null) => {
    if (date !== null) {
      const end_dt = moment(date).format('YYYY-MM-DD');
      setRequestEndDt(end_dt);
    }
  };
  const handleKeywordChange = (e: any) => {
    setRequestKeyword(e.target.value);
  };
  const handleStatusChange = (e: any) => {
    setRequestStatus(e.target.value);
  };

  return (
    <>
      <Table
        className="components-table-demo-nested"
        columns={tableColumns}
        dataSource={eventsData}
        expandedRowRender={expandedRowRender}
      />
      <Modal
        title={request['title']}
        visible={visible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        style={{ minWidth: 750 }}
        bodyStyle={{ textAlign: 'center' }}
      >
        <TextField
          id="standard-basic"
          label="키워드"
          defaultValue={requestKeyword}
          onChange={handleKeywordChange}
          style={{ marginTop: 16, marginBottom: 8 }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            label="수집시작일"
            value={requestStartDt}
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
            value={requestEndDt}
            onChange={handleEndDtChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl style={{ marginTop: 16, marginBottom: 8 }}>
          <InputLabel id="demo-simple-select-label">상태</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={requestStatus}
            onChange={handleStatusChange}
          >
            <MenuItem value="CRS001">대기</MenuItem>
            <MenuItem value="CRS002">진행</MenuItem>
            <MenuItem value="CRS003">완료</MenuItem>
            <MenuItem value="CRS004">취소</MenuItem>
            <MenuItem value="CRS005">오류</MenuItem>
            <MenuItem value="CRS006">테스트</MenuItem>
          </Select>
        </FormControl>
      </Modal>
    </>
  );
};

export { NodeTable };
