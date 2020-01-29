import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import NodeStore from '~stores/node/NodeStore';

type InjectedProps = {
  [STORES.NODE_STORE]: NodeStore;
} & RouteComponentProps<{
  kind: string;
}>;

class NodeCollector extends Component<InjectedProps & RouteComponentProps> {
  componentWillMount(): void {
    const kind = this.props.match.params.kind;
    this.props[STORES.NODE_STORE].nodeData(kind);
  }

  render() {
    const { node } = this.props[STORES.NODE_STORE];
    const kind = this.props.match.params.kind;
    return (
      <>
        <MenuBar subMenu={kind} />
        {node.map(n => (
          <div>{n.seq}</div>
        ))}
      </>
    );
  }
}

export default inject(STORES.NODE_STORE)(observer(NodeCollector));
