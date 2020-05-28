import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import { Tooltip } from 'antd';

type InjectedProps = {
  customer: any;
  viewComplete: boolean;
  viewWorking: boolean;
  viewError: boolean;
  reload: number;
};

function NodeProgress(props: InjectedProps) {
  const complete =
    props.customer.complete !== undefined
      ? parseInt(props.customer.complete)
      : 0;
  const working =
    props.customer.working !== undefined ? parseInt(props.customer.working) : 0;
  const error =
    props.customer.error !== undefined ? parseInt(props.customer.error) : 0;

  let complete_per = complete;
  let working_per = working;
  let error_per = error;

  let sumCnt = 0;

  if (props.viewComplete) {
    sumCnt += complete;
  } 
  if (props.viewWorking) {
    sumCnt += working;
  } 
  if (props.viewError) {
    sumCnt += error;
  }

  if (sumCnt < 100) {
    complete_per = Math.round((100 / sumCnt) * complete);
    working_per = Math.round((100 / sumCnt) * working);
    error_per = Math.round((100 / sumCnt) * error);
  }

  return (
    <>
      <div
        style={{ width: '100%', textAlign: 'left', display: 'inline-block' }}
      >
        <p style={{ marginBottom: 0 }}>{props.customer.name}</p>
        <Progress multi style={{ height: 30 }} max={sumCnt}>
          {props.viewComplete ? (
            <Progress bar value={complete_per}>
              <Tooltip title={complete}>{complete}</Tooltip>
            </Progress>
          ) : null}
          {props.viewWorking ? (
            <Progress animated bar color="warning" value={working_per}>
              <Tooltip title={working}>{working}</Tooltip>
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
