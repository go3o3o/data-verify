import React from 'react';
import { RouteComponentProps } from 'react-router';

import { STORES } from '~constants';

import NodeStore from '~stores/node/NodeStore';

interface InjectedProps {
  [STORES.NODE_STORE]: NodeStore;
}

function NodeMonitoring(props: InjectedProps & RouteComponentProps) {
  const { node } = props[STORES.NODE_STORE];
  return (
    <>
      {node.map(v => (
        <li>{v}</li>
      ))}
    </>
  );
}

export default NodeMonitoring;
