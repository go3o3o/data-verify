import React, { Component, useState } from 'react';
import { Progress, Button } from 'reactstrap';
import { Card, Icon, Table } from 'antd';
import { Button as ButtonA } from 'antd';
import NodeProgress from './NodeProgress';
import AwsSqs from './AwsSqs';

type InjectedProps = {
  progressData: any;
};

function NodeStatus(props: InjectedProps) {
  const [viewComplete, setViewComplete] = useState(true);
  const [viewWorking, setViewWorking] = useState(true);
  const [viewError, setViewError] = useState(true);
  const [reloadSqs, setReloadSqs] = useState(0);
  const [reloadCustomer, setReloadCustomer] = useState(0);

  const refreshClick = (e: any) => {
    var refreshButton = e.target.id;
    if (refreshButton === 'sqs') {
      setReloadSqs(Math.random() * 10);
    } else if (e.target.id === 'customer') {
      setReloadCustomer(Math.random());
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
  for (var i = 0; i < props.progressData.length; i++) {}
  props.progressData.map(data => {
    if (customer_set.has(data.name)) {
      json[data.status] = data.cnt;
    } else {
      customer_set.add(data.name);
      if (Object.keys(json).length !== 0) {
        customer_arr.push(json);
      }
      json = {};
      json['name'] = data.name;
      json[data.status] = data.cnt;
    }
  });

  return (
    <>
      <Card
        style={{
          width: '48%',
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
          <Icon
            type="reload"
            style={{ verticalAlign: 'middle', marginLeft: 5 }}
          />
        </p>
        {customer_arr.map(data => (
          <NodeProgress
            customer={data}
            viewComplete={viewComplete}
            viewWorking={viewWorking}
            viewError={viewError}
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
        style={{ width: '48%', display: 'inline-block', verticalAlign: 'top' }}
      >
        <p style={{ textAlign: 'left', fontSize: 18, fontWeight: 'bold' }}>
          SQS 상태
          <ButtonA id="sqs" onClick={refreshClick} icon="reload" type="link" />
          {/* <Icon
              title="sqs"
              role="sqs"
              type="reload"
              style={{ verticalAlign: 'middle', marginLeft: 5 }}
            /> */}
        </p>
        <AwsSqs reload={reloadSqs} />
      </Card>
    </>
  );
}
export default NodeStatus;
