import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Async from 'react-async';
import { inject, observer } from 'mobx-react';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import NodeStore from '~stores/node/NodeStore';
import NodeStatus from '~pages/NodeCollector/NodeStatus';
import NodeMonitoring from '~pages/NodeCollector/NodeMonitoring';
import { Spin } from 'antd';

type InjectedProps = {
  [STORES.NODE_STORE]: NodeStore;
} & RouteComponentProps<{
  kind: string;
}>;

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
    const loadNodeData = () =>
      this.props[STORES.NODE_STORE].nodeData(kind).then(res => {
        const data = {
          nodeData: res.nodeData.data.data,
          customerData: res.customerIds.data.data,
        };
        // console.log(data);
        return data;
      });
    return (
      <>
        <MenuBar subMenu={kind} />
        <div style={{ textAlign: 'center' }}>
          <Async promiseFn={loadNodeData}>
            <Async.Loading>
              <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                <Spin size="large" />
              </div>
            </Async.Loading>
            <Async.Resolved>
              {data =>
                (function() {
                  if (kind === 'nodeStatus') {
                    return (
                      <div
                        style={{
                          width: '95%',
                          display: 'inline-block',
                          marginTop: 40,
                        }}
                      >
                        <NodeStatus progressData={data['nodeData']} />
                      </div>
                    );
                  } else if (kind === 'nodeMonitoring') {
                    return (
                      <>
                        <div
                          style={{
                            width: '90%',
                            display: 'inline-block',
                            marginTop: 40,
                          }}
                        >
                          <NodeMonitoring
                            monitoringData={data['nodeData']}
                            customerData={data['customerData']}
                          />
                        </div>
                      </>
                    );
                  }
                })()
              }
            </Async.Resolved>
          </Async>
        </div>
      </>
    );
  }
}

export default inject(STORES.NODE_STORE)(observer(NodeCollector));
