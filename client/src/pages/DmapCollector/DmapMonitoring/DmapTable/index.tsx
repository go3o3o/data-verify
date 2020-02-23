import React from 'react';
import Async from 'react-async';

import { Table, Spin, Button, Popover, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import DmapStore from '~stores/dmap/DmapStore';
import { StatusTag } from './statusTag';

const DmapTable = ({ eventsData }: { eventsData: any }) => {
  const tableColumns: ColumnProps<{}>[] = [
    {
      title: '번호',
      dataIndex: 'seq',
      key: 'seq',
      width: 80,
    },
    {
      title: '프로젝트명',
      dataIndex: 'name',
      key: 'name',
      width: 280,
    },
    {
      title: '고객명',
      dataIndex: 'customer_id',
      key: 'customer_id',
      width: 180,
    },
    {
      title: '상시수집',
      dataIndex: 'collect_always_yn',
      key: 'collect_always_yn',
      render: text => {
        if (text === 'Y') {
          return (
            <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
          );
        } else {
          return <span style={{ color: '#DBDBDB' }}>{text}</span>;
        }
      },
    },
    {
      title: '소급수집',
      dataIndex: 'collect_retroactive_yn',
      key: 'collect_retroactive_yn',
      render: text => {
        if (text === 'Y') {
          return (
            <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
          );
        } else {
          return <span style={{ color: '#DBDBDB' }}>{text}</span>;
        }
      },
    },
    {
      title: '소급수집 시작일',
      dataIndex: 'collect_start_dt',
      key: 'collect_start_dt',
    },
    {
      title: '소급수집 종료일',
      dataIndex: 'collect_end_dt',
      key: 'collect_end_dt',
    },
    {
      title: '검색트렌드',
      dataIndex: 'collect_trend_yn',
      key: 'collect_trend_yn',
      render: text => {
        if (text === 'Y') {
          return (
            <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
          );
        } else {
          return <span style={{ color: '#DBDBDB' }}>{text}</span>;
        }
      },
    },
    {
      title: '조회수',
      dataIndex: 'collect_trend_count_yn',
      key: 'collect_trend_count_yn',
      render: text => {
        if (text === 'Y') {
          return (
            <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
          );
        } else {
          return <span style={{ color: '#DBDBDB' }}>{text}</span>;
        }
      },
    },
    {
      title: '연관어',
      dataIndex: 'collect_classification_yn',
      key: 'collect_classification_yn',

      render: text => {
        if (text === 'Y') {
          return (
            <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
          );
        } else {
          return <span style={{ color: '#DBDBDB' }}>{text}</span>;
        }
      },
    },
    {
      title: 'BICA',
      dataIndex: 'bicaInfo',
      key: 'bicaInfo',
      align: 'center',
      render: text => {
        if (text['ip'].length > 0) {
          const content = (
            <>
              <div>ip: {text['ip']}</div>
              <div>port: {text['port']}</div>
              <div>conceptId: {text['conceptId']}</div>
            </>
          );
          return (
            <Popover content={content} title="BICA 정보" trigger="click">
              {/* <Button size="small" shape="circle" icon="check" /> */}
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
            </Popover>
          );
        }
      },
    },
  ];

  const loadDmapDetailData = (project_seq: number) => {
    const dmapStore = new DmapStore();
    return dmapStore.dmapDetailData(project_seq).then(res => {
      return res.data;
    });
  };

  const expandedRowRender = (e: any) => {
    const project_seq = e.seq;
    const columns = [
      {
        title: '수집일',
        dataIndex: 'pub_day',
        key: 'pub_day',
      },
      {
        title: '채널1',
        dataIndex: 'depth1_seq',
        key: 'depth1_seq',
      },
      {
        title: '채널2',
        dataIndex: 'depth2_seq',
        key: 'depth2_seq',
      },
      {
        title: '채널3',
        dataIndex: 'depth3_seq',
        key: 'depth3_seq',
      },
      {
        title: '키워드',
        dataIndex: 'keyword',
        key: 'keyword',
      },
      {
        title: '상태',
        dataIndex: 'state',
        key: 'state',
        render: ( record: any) => (
          <StatusTag table="progress" status={record.state} />
        ),
      },
    ];

    return (
      <Async promise={loadDmapDetailData(project_seq)}>
        <Async.Loading>
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <Spin size="large" />
          </div>
        </Async.Loading>
        <Async.Resolved>
          {data => {
            return (
              <Table size="small" columns={columns} dataSource={data['data']} />
            );
          }}
        </Async.Resolved>
      </Async>
    );
  };

  return (
    <Table
      className="components-table-demo-nested"
      columns={tableColumns}
      dataSource={eventsData}
      expandedRowRender={expandedRowRender}
      // scroll={{ x: 1500, y: 300 }}
    />
  );
};

export { DmapTable };
