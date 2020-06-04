import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Card, Icon } from 'antd';

import NodeProgress from './NodeProgress';
import AwsSqs from './AwsSqs';

type InjectedProps = {
  statusData: any;
};

function NodeStatus(props: InjectedProps) {
  const [viewComplete, setViewComplete] = useState(true);
  const [viewWorking, setViewWorking] = useState(true);
  const [viewError, setViewError] = useState(true);
  const [reloadSqs, setReloadSqs] = useState(0);
  const [reloadProgress, setReloadProgress] = useState(0);

  const refreshClick = (e: any) => {
    var refreshButton = e.currentTarget.id;
    // console.log(refreshButton);
    if (refreshButton === 'sqs') {
      setReloadSqs(Math.random() * 10);
    } else if (e.target.id === 'progress') {
      setReloadProgress(Math.random() * 10);
    }
  };
  const buttonClick = (e: any) => {
    const progressButton = e.target.id;
    if (progressButton === 'complete') {
      setViewComplete(!viewComplete);
    } else if (progressButton === 'working') {
      setViewWorking(!viewWorking);
    } else if (progressButton === 'error') {
      setViewError(!viewError);
    }
  };

  var customer_set = new Set();
  var customer_arr: object[] = [];
  var json = {};
  props.statusData.map((data: any) => {
    // customer_set<>: customer 중복 제거해서 set에 담기
    if (customer_set.has(data.name)) {
      // { name: customer, [complete: 0, working: 0, error: 0] }
      json[data.status] = data.cnt;
    } else {
      // { name: customer }
      customer_set.add(data.name);
      json = {};
      json['name'] = data.name;
      json[data.status] = data.cnt;
      if (Object.keys(json).length !== 0) {
        customer_arr.push(json);
      }
    }
  });

  return (
    <>
      <Card
        style={{
          width: '49%',
          display: 'inline-block',
          verticalAlign: 'top',
          marginRight: 20,
        }}
      >
        <p
          style={{
            textAlign: 'left',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          고객별 수집 현황
          <a id="progress" onClick={refreshClick}>
            <Icon
              type="reload"
              style={{ verticalAlign: 'middle', marginLeft: 5 }}
            />
          </a>
        </p>
        {customer_arr.map(data => (
          <NodeProgress
            customer={data}
            viewComplete={viewComplete}
            viewWorking={viewWorking}
            viewError={viewError}
            reload={reloadProgress}
          />
        ))}
        <div style={{ marginTop: 10 }}>
          <Button
            outline={viewComplete ? false : true}
            id="complete"
            color="primary"
            style={{
              height: '20px',
              width: '30px',
              padding: 0,
              margin: 5,
            }}
            onClick={buttonClick}
          >
            <p id="complete" style={{ fontSize: 10 }}>
              완료
            </p>
          </Button>
          <Button
            outline={viewWorking ? false : true}
            id="working"
            color="warning"
            style={{
              height: '20px',
              width: '30px',
              padding: 0,
              margin: 5,
            }}
            onClick={buttonClick}
          >
            <p id="working" style={{ fontSize: 10 }}>
              진행
            </p>
          </Button>
          <Button
            outline={viewError ? false : true}
            id="error"
            color="danger"
            style={{
              height: '20px',
              width: '30px',
              padding: 0,
              margin: 5,
            }}
            onClick={buttonClick}
          >
            <p id="error" style={{ fontSize: 10 }}>
              에러
            </p>
          </Button>
        </div>
      </Card>
      <Card
        style={{ width: '49%', display: 'inline-block', verticalAlign: 'top' }}
      >
        <p style={{ textAlign: 'left', fontSize: 18, fontWeight: 'bold' }}>
          SQS 상태
          <a id="sqs" onClick={refreshClick}>
            <Icon
              type="reload"
              style={{ verticalAlign: 'middle', marginLeft: 5 }}
            />
          </a>
        </p>
        <AwsSqs reload={reloadSqs} />
      </Card>
    </>
  );
}
export default NodeStatus;
