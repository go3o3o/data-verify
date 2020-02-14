import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { inject, observer } from "mobx-react";
import Async from "react-async";

import {
  Table,
  Form,
  Spin,
  Layout,
  Icon,
  Modal,
  Descriptions,
  PageHeader
} from "antd";
import { ColumnProps } from "antd/lib/table";
import "antd/dist/antd.css";

import { STORES } from "~constants";

import VerifyStore from "~stores/verify/VerifyStore";

import MenuBar from "~components/MenuBar";
import SideBar from "~components/SideBar";
import { FilterCustomer } from "./FilterCustomer";
import { FilterCollectType } from "./FilterCollectType";
import { FilterDocDatetime } from "./FilterDocDatetime";

type InjectedProps = {
  [STORES.VERIFY_STORE]: VerifyStore;
} & RouteComponentProps<{
  collapsed: string;
}>;

const { Header, Sider, Content } = Layout;

class CollectRetroactive extends Component<
  InjectedProps & RouteComponentProps
> {
  constructor(props: any) {
    super(props);
    this.state = {
      retroactiveData: undefined,
      visible: false,
      viewData: undefined
    };
    this.props[STORES.VERIFY_STORE].retroactiveData();

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.loadRetroactiveData = this.loadRetroactiveData.bind(this);
    this.loadRetroactiveDetailData = this.loadRetroactiveDetailData.bind(this);
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

  loadRetroactiveData(data): object[] {
    if (this.state["retroactiveData"] === undefined) {
      data.map(d => {
        d["filterCustomer"] = true;
        d["filterCollectType"] = true;
        d["filterDocDatetime"] = true;
        if (d.collect_type == 0) {
          d["collect_type_nm"] = "디맵수집기";
        }
        if (d.collect_type == 1) {
          d["collect_type_nm"] = "신규수집기";
        }
      });
      return data;
    }
    return this.state["retroactiveData"];
  }

  loadRetroactiveDetailData = (customer_id: string, channel: string) => {
    return this.props[STORES.VERIFY_STORE]
      .retroactiveDetailData(customer_id, channel)
      .then(res => {
        return res.data;
      });
  };

  handleFilter = (name, column, value, data) => {
    var retroactiveData: object[] = [];
    if (value === "all") {
      retroactiveData = data.filter(d => {
        d[name] = true;
        return (
          d["filterCustomer"] === true &&
          d["filterCollectType"] === true &&
          d["filterDocDatetime"] === true
        );
      });
    } else {
      retroactiveData = data.filter(d => {
        if (d[column] === value) {
          d[name] = true;
        } else {
          d[name] = false;
        }
        return (
          d["filterCustomer"] === true &&
          d["filterCollectType"] === true &&
          d["filterDocDatetime"] === true
        );
      });
    }
    this.setState({ retroactiveData: retroactiveData });
  };

  render() {
    var { data } = this.props[STORES.VERIFY_STORE];
    var { customers } = this.props[STORES.VERIFY_STORE];

    const collapsed = this.props.match.params.collapsed;

    const expandedRowRender = (e: any) => {
      const customer_id = e.customer_id;
      const channel = e.channel;

      const columns: ColumnProps<{}>[] = [
        {
          title: "수집일자",
          dataIndex: "doc_datetime",
          key: "doc_datetime",
          ellipsis: true
        },
        {
          title: "수집채널",
          dataIndex: "channel",
          key: "channel",
          ellipsis: true
        },
        {
          title: "제목",
          dataIndex: "doc_title",
          key: "doc_title",
          ellipsis: true
        },
        {
          title: "내용",
          dataIndex: "doc_content",
          key: "doc_content",
          ellipsis: true
        },
        { title: "URL", dataIndex: "doc_url", key: "doc_url", ellipsis: true },
        {
          title: "첨부여부",
          dataIndex: "attach_yn",
          key: "attach_yn",
          ellipsis: true
        },
        {
          title: "상세보기",
          dataIndex: "detail",
          key: "detail",
          align: "center"
        }
      ];

      const onClick = data => {
        this.setState({ viewData: data });
        this.showModal();
      };

      return (
        <Async promise={this.loadRetroactiveDetailData(customer_id, channel)}>
          <Async.Loading>
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <Spin size="large" />
            </div>
          </Async.Loading>
          <Async.Resolved>
            {data => {
              data["data"].map(d => {
                d["detail"] = (
                  <>
                    <Icon
                      type="file"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      onClick={() => onClick(d)}
                    />
                    {/* <Button
                      type="link"
                      shape="circle"
                      size="large"
                      icon="file"
                      onClick={() => onClick(d)}
                    /> */}
                  </>
                );
              });

              return <Table columns={columns} dataSource={data["data"]} />;
            }}
          </Async.Resolved>
        </Async>
      );
    };

    const columns = [
      {
        title: "고객명",
        dataIndex: "customer_id",
        key: "customer_id",
        width: "20%"
      },
      { title: "수집채널", dataIndex: "channel", key: "channel", width: "60%" },
      {
        title: "수집방법",
        dataIndex: "collect_type_nm",
        key: "collect_type_nm",
        width: "20%"
      }
    ];

    return (
      <>
        <Layout style={{ height: "100vh" }}>
          <SideBar
            selectedKeys="retroactive"
            openKeys=""
            collapsed={collapsed}
          />
          <Layout style={{ background: "#051428" }}>
            <Header
              style={{
                margin: "16px 16px 0",
                padding: 0
              }}
            >
              <PageHeader
                style={{ background: "#fff" }}
                title={
                  <span style={{ fontSize: 26, color: "#051428" }}>
                    소급수집
                  </span>
                }
                subTitle={
                  <span style={{ color: "#A7ADB4" }}>
                    소급수집 전체 데이터 검증
                  </span>
                }
              />
            </Header>
            <Content style={{ margin: "16px 16px 0", overflow: "initial" }}>
              <div
                style={{
                  padding: 24,
                  background: "#fff",
                  textAlign: "center"
                }}
              >
                <Form
                  layout="inline"
                  style={{ textAlign: "left", marginBottom: 25 }}
                >
                  <Form.Item>
                    <FilterCustomer
                      filterBy={this.handleFilter}
                      data={data}
                      customers={customers}
                    />
                  </Form.Item>
                  <Form.Item>
                    <FilterCollectType
                      filterBy={this.handleFilter}
                      data={data}
                    />
                  </Form.Item>
                  <Form.Item>
                    {/* <FilterDocDatetime
                  filterBy={this.handleFilter}
                  retroactiveData={data}
                /> */}
                  </Form.Item>
                </Form>

                <Table
                  className="components-table-demo-nested"
                  columns={columns}
                  dataSource={this.loadRetroactiveData(data)}
                  expandedRowRender={expandedRowRender}
                />
                <Modal
                  width={1000}
                  title={
                    this.state["visible"] ? (
                      <p style={{ margin: 2 }}>
                        {`${this.state["viewData"].customer_id} >
                      ${this.state["viewData"].channel}`}
                      </p>
                    ) : (
                      <p>No Data</p>
                    )
                  }
                  visible={this.state["visible"]}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  {this.state["visible"] ? (
                    <>
                      <Descriptions bordered>
                        <Descriptions.Item label="제목" span={3}>
                          {this.state["viewData"].doc_title}
                        </Descriptions.Item>
                        <Descriptions.Item label="작성자" span={1}>
                          {this.state["viewData"].doc_writer}
                        </Descriptions.Item>
                        <Descriptions.Item label="채널" span={1}>
                          {this.state["viewData"].channel}
                        </Descriptions.Item>
                        <Descriptions.Item label="게시일" span={1}>
                          {this.state["viewData"].doc_datetime}
                        </Descriptions.Item>
                        <Descriptions.Item label="URL" span={3}>
                          <a
                            href={this.state["viewData"].doc_url}
                            target="_blank"
                          >
                            {" "}
                            {this.state["viewData"].doc_url}
                          </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="내용" span={3}>
                          {this.state["viewData"].doc_content}
                        </Descriptions.Item>
                      </Descriptions>
                    </>
                  ) : (
                    <p>No Data</p>
                  )}
                </Modal>
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default inject(STORES.VERIFY_STORE)(observer(CollectRetroactive));
