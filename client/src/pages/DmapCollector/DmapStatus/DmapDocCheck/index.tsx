import React, { PureComponent, Component } from 'react';
import { Async } from 'react-async';
import {
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Spin } from 'antd';

import DmapStore from '~stores/dmap/DmapStore';

type InjectedProps = {
  project: any;
};

class DmapDocCheck extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.project.seq !== nextProps.project.seq) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const loadDocCheckData = (project_seq: number) => {
      const dmapStore = new DmapStore();

      return dmapStore.docCheckData(project_seq).then(res => {
        return res.data.data;
      });
    };
    return (
      <>
        <p style={{ textAlign: 'left', fontSize: 18, fontWeight: 'bold' }}>
          [{this.props.project.name}] 수집 건수 추이
        </p>
        <Async promise={loadDocCheckData(this.props.project.seq)}>
          <Async.Loading>
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <Spin size="large" />
            </div>
          </Async.Loading>
          <Async.Resolved>
            {cnt =>
              (function() {
                return (
                  <ResponsiveContainer width="100%" height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <LineChart
                      data={cnt}
                      
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="pub_day" />
                      {/* <YAxis domain={[0, 'dataMax + 1000']} /> */}
                      <YAxis domain={[0, 15000]} />
                      <Tooltip />
                      <Legend />

                      <Line type="monotone" dataKey="cnt" stroke="#357AF7" />
                    </LineChart>
                  </ResponsiveContainer>
                );
              })()
            }
          </Async.Resolved>
        </Async>
      </>
    );
  }
}

export default DmapDocCheck;
