import React from "react";
import Async from "react-async";

import { Table, Popconfirm, Icon, Spin } from "antd";
import "antd/dist/antd.css";

import { StatusTag } from "./statusTag";
import NodeStore from "~stores/node/NodeStore";

const NodeTable = ({ eventsData }) => {
  const tableColumns = [
    {
      title: "번호",
      dataIndex: "seq",
      key: "seq"
    },
    {
      title: "고객",
      dataIndex: "customer_id",
      key: "customer_id"
    },
    {
      title: "채널",
      dataIndex: "channel",
      key: "channel"
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "주기",
      dataIndex: "period",
      key: "period"
    },
    {
      title: "시작일",
      dataIndex: "start_dt",
      key: "start_dt"
    },
    {
      title: "종료일",
      dataIndex: "end_dt",
      key: "end_dt"
    },
    {
      title: "키워드",
      dataIndex: "keyword",
      key: "keyword"
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <StatusTag table="request" status={record.status} />
      )
    }
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Popconfirm
    //       title="Are you sure？"
    //       icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
    //     >
    //       <a href="#">Delete</a>
    //     </Popconfirm>
    //   )
    // }
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
        title: "시작일",
        dataIndex: "start_dt",
        key: "start_dt",
        width: "15%"
      },
      {
        title: "종료일",
        dataIndex: "end_dt",
        key: "end_dt",
        width: "15%"
      },
      {
        title: "상태",
        key: "status",
        width: "15%",
        filters: [
          { text: "working", value: "Request" },
          { text: "complete", value: "Finished" },
          { text: "error", value: "Error" }
        ],
        onFilter: (value, record) => record.status.includes(value),
        render: (text, record) => (
          <StatusTag table="progress" status={record.status} />
        )
      },
      {
        title: "에러메시지",
        dataIndex: "error_msg",
        key: "error_msg",
        width: "50%"
      },
      {
        title: "OnGoing",
        dataIndex: "on_going_flag",
        key: "on_going_flag"
      }
    ];

    return (
      <Async promise={loadNodeDetailData(request_seq)}>
        <Async.Loading>
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <Spin size="large" />
          </div>
        </Async.Loading>
        <Async.Resolved>
          {data => {
            return (
              <Table size="small" columns={columns} dataSource={data["data"]} />
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
    />
  );
};

export { NodeTable };
