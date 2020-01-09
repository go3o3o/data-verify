import React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { STORES } from '~constants';

import NodeStore from '~stores/node/NodeStore';
import TopBar from '~components/TopBar';
import SubBar from '~components/SubBar';

interface InjectedProps {
  [STORES.NODE_STORE]: NodeStore;
}

function NodeCollector(props: InjectedProps & RouteComponentProps) {
  return (
    <>
      <TopBar />
      <div>신규수집기</div>
    </>
  );
}

export default NodeCollector;
