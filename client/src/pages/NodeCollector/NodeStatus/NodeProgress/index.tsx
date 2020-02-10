import React from 'react';
import { Progress } from 'reactstrap';
import { Tooltip } from 'antd';

type InjectedProps = {
  customer: any;
  viewComplete: boolean;
  viewWorking: boolean;
  viewError: boolean;
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

  const sumCnt = complete + working + error;

  return (
    <>
      <div
        style={{ width: '100%', textAlign: 'left', display: 'inline-block' }}
      >
        <p style={{ marginBottom: 0 }}>{props.customer.name}</p>
        <Progress multi style={{ height: 30 }} max={sumCnt}>
          {props.viewComplete ? (
            <Progress animated bar value={complete}>
              <Tooltip title={complete}>{complete}</Tooltip>
            </Progress>
          ) : null}
          {props.viewWorking ? (
            <Progress animated bar color="warning" value={working}>
              <Tooltip title={working}>{working}</Tooltip>
            </Progress>
          ) : null}
          {props.viewError ? (
            <Progress animated bar color="danger" value={error}>
              <Tooltip title={error}>{error}</Tooltip>
            </Progress>
          ) : null}
        </Progress>
      </div>
    </>
  );
}

export default NodeProgress;
