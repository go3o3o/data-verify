import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { STORES } from '~constants';

import MenuBar from '~components/MenuBar';
import DmapStore from '~stores/dmap/DmapStore';

type InjectedProps = {
  [STORES.DMAP_STORE]: DmapStore;
} & RouteComponentProps<{
  kind: string;
}>;

class DmapCollector extends Component<InjectedProps & RouteComponentProps> {
  componentWillMount(): void {
    const kind = this.props.match.params.kind;
    this.props[STORES.DMAP_STORE].dmapData(kind);
  }

  render() {
    const { dmap } = this.props[STORES.DMAP_STORE];
    const kind = this.props.match.params.kind;
    return (
      <>
        <MenuBar subMenu={kind} />
        {dmap.map(n => (
          <div>{n.seq}</div>
        ))}
      </>
    );
  }
}

export default inject(STORES.DMAP_STORE)(observer(DmapCollector));
