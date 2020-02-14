import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import { Tooltip } from 'antd';

type InjectedProps = {
  project: any;
  projectClick: any;
  viewComplete: boolean;
  viewWorking: boolean;
  viewError: boolean;
};

function DmapProgress(props: InjectedProps) {
  const complete =
    props.project.complete !== undefined ? parseInt(props.project.complete) : 0;
  const working =
    props.project.working !== undefined ? parseInt(props.project.working) : 0;
  const error =
    props.project.error !== undefined ? parseInt(props.project.error) : 0;

  const sumCnt = complete + working + error;

  const onClick = () => {
    props.projectClick(props.project.seq, props.project.name);
  };

  return (
    <>
      <div
        style={{ width: '100%', textAlign: 'left', display: 'inline-block' }}
      >
        <p style={{ marginBottom: 0 }}>
          <a onClick={onClick}>{props.project.name}</a>
        </p>
        <Progress multi style={{ height: 30 }} max={sumCnt}>
          {props.viewComplete ? (
            <Progress bar value={complete}>
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

export default DmapProgress;
