import React, { Component } from 'react';
import { Async } from 'react-async';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import moment from 'moment';
import { Spin, DatePicker } from 'antd';

import DmapStore from '~stores/dmap/DmapStore';

type InjectedProps = {
  project: any;
};

class DmapDocCheck extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      keywordSet: [],
      startIndex: '',
      endIndex: '',
      startDate: moment(),
      endDate: moment(),
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (
      this.props.project.seq !== nextProps.project.seq ||
      ((this.state['startIndex'] !== nextState.startIndex ||
        this.state['endIndex'] !== nextState.endIndex) &&
        nextState.startIndex !== -1 &&
        nextState.endIndex !== -1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  Tooltip = (e: any) => {
    var total = 0;
    if (e.active) {
      return (
        <>
          <div className="custom-tooltip">
            <p className="label">{e.label}</p>
            {e.payload.map((payload: object) => {
              total += payload['value'];
              return (
                <p
                  className="payload"
                  style={{
                    color: payload['fill'],
                  }}
                >{`${payload['name']} : ${payload['value']}`}</p>
              );
            })}
            <p className="label">Total: {total}</p>
          </div>
        </>
      );
    }
  };

  handleBrushOnChange = (e: any) => {
    var changeStartDate = this.state['data'][e.startIndex]['pub_day'];
    var changeEndDate = this.state['data'][e.endIndex]['pub_day'];
    this.setState({ startDate: changeStartDate, endDate: changeEndDate });
  };

  handleDateOnChange = (dates: any, dateStrings: [string, string]) => {
    var startDate = dateStrings[0].replace(/-/g, '');
    var endDate = dateStrings[1].replace(/-/g, '');
    var startIndex = this.state['data'].findIndex((data: object) =>
      data['pub_day'].includes(startDate),
    );

    var lastDate = this.state['data'][this.state['data'].length - 1]['pub_day'];
    // 마지막 수집 일자 < 선택한 마지막 일자
    if (lastDate < endDate) {
      endDate = lastDate;
    }
    console.log(endDate);
    var endIndex = this.state['data'].findIndex((data: object) =>
      data['pub_day'].includes(endDate),
    );
    this.setState({ startIndex, endIndex });
  };

  render() {
    const loadDocCheckData = (project_seq: number) => {
      const dmapStore = new DmapStore();

      return dmapStore.docCheckData(project_seq).then(res => {
        var docCountArray: object[] = [];
        var docCountJson = {};
        var pubDayCheck = new Set();
        var keywordSet = new Set();
        res.data.data.map((docCnt: object) => {
          // keyword 중복 제거하여 배열에 담기
          keywordSet.add(docCnt['keyword']);
          if (pubDayCheck.has(docCnt['pub_day'])) {
            docCountJson[docCnt['keyword']] = Number(docCnt['cnt']); // [{pub_day:'20200224', keyword1:30, keyword2:20, ...}]
          } else {
            // json 이 값을 가지고 있으면 배열에 담기
            if (Object.keys(docCountJson).length > 0) {
              docCountArray.push(docCountJson);
            }

            // 다음 pub_day를 추가
            pubDayCheck.add(docCnt['pub_day']);
            // json 초기화
            docCountJson = {};
            docCountJson['pub_day'] = docCnt['pub_day']; // [{pub_day:'20200224'}]
            docCountJson[docCnt['keyword']] = Number(docCnt['cnt']); // [{pub_day:'20200224', keyword1:30}]
          }
        });

        var startIndex = docCountArray.length - 31;
        var endIndex = docCountArray.length - 1;

        this.setState({ data: docCountArray });
        this.setState({
          startIndex: startIndex,
          endIndex: endIndex,
        });
        this.setState({
          startDate: docCountArray[startIndex]['pub_day'],
          endDate: docCountArray[endIndex]['pub_day'],
        });
        this.setState({ keywordSet: Array.from(keywordSet) });
        return docCountArray;
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
            {(cnt: any[]) => {
              console.log(moment(this.state['startDate']));
              return (
                <>
                  {cnt.length > 0 ? (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <DatePicker.RangePicker
                          defaultValue={[
                            moment(this.state['startDate']),
                            moment(this.state['endDate']),
                          ]}
                          format="YYYY-MM-DD"
                          dateRender={(current: any) => {
                            const style = {};
                            return (
                              <div className="ant-calendar-date" style={style}>
                                {current.date()}
                              </div>
                            );
                          }}
                          ranges={{
                            Today: [moment(), moment()],
                            'This Month': [
                              moment().startOf('month'),
                              moment().endOf('month'),
                            ],
                          }}
                          onChange={this.handleDateOnChange}
                        />
                      </div>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                          data={cnt}
                          margin={{ top: 0, right: 30, bottom: 0, left: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="pub_day" />
                          <YAxis />
                          {/* <Tooltip content={this.Tooltip} /> */}
                          <Tooltip />
                          <Legend />
                          {this.state['keywordSet'].map((keyword: string) => (
                            <Bar
                              dataKey={keyword}
                              stackId="a"
                              opacity="0.8"
                              fill={`#${Math.random()
                                .toString(16)
                                .substr(-6)}`}
                            />
                          ))}

                          <Brush
                            dataKey="pub_day"
                            height={30}
                            stroke="#EAECEF"
                            startIndex={this.state['startIndex']}
                            endIndex={this.state['endIndex']}
                            onChange={this.handleBrushOnChange}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </>
                  ) : null}
                </>
              );
            }}
          </Async.Resolved>
        </Async>
      </>
    );
  }
}

export default DmapDocCheck;
