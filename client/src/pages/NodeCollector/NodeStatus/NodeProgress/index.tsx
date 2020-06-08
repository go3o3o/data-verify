import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import { Tooltip } from 'antd';

type InjectedProps = {
  customer: any;
  viewFinished: boolean;
  viewRequest: boolean;
  viewError: boolean;
  reload: number;
};

function NodeProgress(props: InjectedProps) {
  const finished =
    props.customer.finished !== undefined
      ? parseInt(props.customer.finished)
      : 0;
  const request =
    props.customer.request !== undefined ? parseInt(props.customer.request) : 0;
  const error =
    props.customer.error !== undefined ? parseInt(props.customer.error) : 0;

  let finished_per = finished;
  let request_per = request;
  let error_per = error;

  let sumCnt = 0;

  if (props.viewFinished) {
    sumCnt += finished;
  }
  if (props.viewRequest) {
    sumCnt += request;
  }
  if (props.viewError) {
    sumCnt += error;
  }

  if (sumCnt < 100) {
    finished_per = Math.round((100 / sumCnt) * finished);
    request_per = Math.round((100 / sumCnt) * request);
    error_per = Math.round((100 / sumCnt) * error);
  }

  return (
    <>
      <div
        style={{ width: '100%', textAlign: 'left', display: 'inline-block' }}
      >
        <p style={{ marginBottom: 0 }}>{props.customer.name}</p>
        <Progress multi style={{ height: 30 }} max={sumCnt}>
          {props.viewFinished ? (
            <Progress bar value={finished_per}>
              <Tooltip title={finished}>{finished}</Tooltip>
            </Progress>
          ) : null}
          {props.viewRequest ? (
            <Progress animated bar color="warning" value={request_per}>
              <Tooltip title={request}>{request}</Tooltip>
            </Progress>
          ) : null}
          {props.viewError ? (
            <Progress animated bar color="danger" value={error_per}>
              <Tooltip title={error}>{error}</Tooltip>
            </Progress>
          ) : null}
        </Progress>
      </div>
    </>
  );
}

export default NodeProgress;
