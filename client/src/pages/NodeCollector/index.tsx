import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import Async from 'react-async';

import { Layout, Spin, PageHeader } from 'antd';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import SideBar from '~components/SideBar';
import NodeStore from '~stores/node/NodeStore';
import NodeStatus from '~pages/NodeCollector/NodeStatus';
import NodeMonitoring from '~pages/NodeCollector/NodeMonitoring';
import NodeRule from './NodeRule';

type InjectedProps = {
  [STORES.NODE_STORE]: NodeStore;
} & RouteComponentProps<{
  kind: string;
  collapsed: string;
}>;

const { Header, Sider, Content } = Layout;

class NodeCollector extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = { node: [] };
  }
  componentWillMount(): void {
    const kind = this.props.match.params.kind;
    this.props[STORES.NODE_STORE].nodeData(kind);
  }

  render() {
    const kind = this.props.match.params.kind;
    const collapsed = this.props.match.params.collapsed;
    const loadNodeData = () =>
      this.props[STORES.NODE_STORE].nodeData(kind).then(res => {
        const data = {
          nodeData: res.nodeData.data.data,
          customerData: res.customers.data.data,
        };
        // console.log(data);
        return data;
      });
    return (
      <>
        <Layout style={{ height: '100vh' }}>
          <SideBar selectedKeys={kind} openKeys="node" collapsed={collapsed} />
          <Layout style={{ background: '#051428' }}>
            <Header
              style={{
                margin: '16px 16px 0',
                padding: 0,
              }}
            >
              <PageHeader
                style={{ background: '#fff' }}
                title={(function() {
                  if (kind === 'nodeStatus') {
                    return (
                      <span style={{ fontSize: 26, color: '#051428' }}>
                        신규수집기 - 현황
                      </span>
                    );
                  }
                  if (kind === 'nodeMonitoring') {
                    return (
                      <span
                        style={{
                          fontSize: 26,
                          color: '#051428',
                        }}
                      >
                        신규수집기 - 모니터링
                      </span>
                    );
                  }
                  if (kind === 'nodeRule') {
                    return (
                      <span
                        style={{
                          fontSize: 26,
                          color: '#051428',
                        }}
                      >
                        신규수집기 - 룰
                      </span>
                    );
                  }
                })()}
                subTitle={(function() {
                  if (kind === 'nodeStatus') {
                    return (
                      <span style={{ color: '#A7ADB4' }}>
                        고객별 수집 현황 및 AWS SQS 상태 확인
                      </span>
                    );
                  }
                  if (kind === 'nodeMonitoring') {
                    return (
                      <span style={{ color: '#A7ADB4' }}>
                        수집 요청 건 및 진행현황 모니터링
                      </span>
                    );
                  }
                  if (kind === 'nodeRule') {
                    return (
                      <span style={{ color: '#A7ADB4' }}>룰 확인 및 수정</span>
                    );
                  }
                })()}
              />
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  textAlign: 'center',
                }}
              >
                <Async promiseFn={loadNodeData}>
                  <Async.Loading>
                    <div
                      style={{ position: 'absolute', top: '50%', left: '50%' }}
                    >
                      <Spin size="large" />
                    </div>
                  </Async.Loading>
                  <Async.Resolved>
                    {data =>
                      (function() {
                        if (kind === 'nodeStatus') {
                          return <NodeStatus statusData={data['nodeData']} />;
                        }
                        if (kind === 'nodeMonitoring') {
                          return (
                            <NodeMonitoring
                              monitoringData={data['nodeData']}
                              customerData={data['customerData']}
                            />
                          );
                        }
                        if (kind === 'nodeRule') {
                          return <NodeRule />;
                        }
                      })()
                    }
                  </Async.Resolved>
                </Async>
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default inject(STORES.NODE_STORE)(observer(NodeCollector));
