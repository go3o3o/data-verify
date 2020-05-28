import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import Async from 'react-async';

import { Layout, Spin, PageHeader } from 'antd';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import SideBar from '~components/SideBar';
import DmapStore from '~stores/dmap/DmapStore';
import DmapStatus from './DmapStatus';
import DmapMonitoring from './DmapMonitoring';
import DmapQueue from './DmapQueue';

type InjectedProps = {
  [STORES.DMAP_STORE]: DmapStore;
} & RouteComponentProps<{
  kind: string;
  collapsed: string;
}>;

const { Header, Sider, Content } = Layout;

class DmapCollector extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = { dmap: [] };
  }

  componentWillMount(): void {
    const kind = this.props.match.params.kind;
    this.props[STORES.DMAP_STORE].dmapData(kind);
  }

  render() {
    const kind = this.props.match.params.kind;
    const collapsed = this.props.match.params.collapsed;

    const loadDmapData = () =>
      this.props[STORES.DMAP_STORE].dmapData(kind).then(res => {
        const data = {
          dmapData: res.dmapData.data.data,
          sourceData: res.source.data.data,
          customers: res.customers.data.data,
        };

        return data;
      });
    return (
      <>
        <Layout style={{ height: '100vh' }}>
          <SideBar selectedKeys={kind} openKeys="dmap" collapsed={collapsed} />
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
                  if (kind === 'dmapQueue') {
                    return (
                      <span style={{ fontSize: 26, color: '#051428' }}>
                        디맵수집기 - 수집요청
                      </span>
                    );
                  }
                  if (kind === 'dmapStatus') {
                    return (
                      <span style={{ fontSize: 26, color: '#051428' }}>
                        디맵수집기 - 현황
                      </span>
                    );
                  }
                  if (kind === 'dmapMonitoring') {
                    return (
                      <span style={{ fontSize: 26, color: '#051428' }}>
                        디맵수집기 - 모니터링
                      </span>
                    );
                  }
                })()}
                subTitle={(function() {
                  if (kind === 'dmapQueue') {
                    return (
                      <span style={{ color: '#A7ADB4' }}>수집요청 현황</span>
                    );
                  }
                  if (kind === 'dmapStatus') {
                    return (
                      <span style={{ color: '#A7ADB4' }}>
                        프로젝트별 수집 현황 및 수집 건수 확인
                      </span>
                    );
                  }
                  if (kind === 'dmapMonitoring') {
                    return (
                      <span style={{ color: '#A7ADB4' }}>
                        프로젝트별 수집 진행 사항 모니터링
                      </span>
                    );
                  }
                })()}
              />
            </Header>
            <Content style={{ margin: '16px 16px 0', overflow: 'initial' }}>
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  textAlign: 'center',
                }}
              >
                <Async promiseFn={loadDmapData}>
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
                        if (kind === 'dmapQueue') {
                          return <DmapQueue />;
                        } else if (kind === 'dmapStatus') {
                          return (
                            <DmapStatus
                              statusData={data['dmapData']}
                              customerData={data['customers']}
                            />
                          );
                        } else if (kind === 'dmapMonitoring') {
                          return (
                            <DmapMonitoring
                              monitoringData={data['dmapData']}
                              sourceData={data['sourceData']}
                              customerData={data['customers']}
                            />
                          );
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

export default inject(STORES.DMAP_STORE)(observer(DmapCollector));
