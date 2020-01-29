import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import { STORES, PAGE_PATHS } from '~constants';
import CollectCount from '~pages/CollectCount';
import NodeCollector from '~pages/NodeCollector';
import DmapCollector from '~pages/DmapCollector';
import CollectRetroactive from '~pages/CollectRetroactive';
import CollectAlways from '~pages/CollectAlways';

@inject(STORES.NODE_STORE)
@observer
@autobind
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={`${PAGE_PATHS.NODE}/:kind`} component={NodeCollector} />
          <Route path={`${PAGE_PATHS.DMAP}/:kind`} component={DmapCollector} />

          <Route path={`${PAGE_PATHS.COUNT}`} component={CollectCount} />
          <Route
            path={`${PAGE_PATHS.COUNT}/:customer_id`}
            component={CollectCount}
          />

          <Route path={`${PAGE_PATHS.DATA}/always`} component={CollectAlways} />
          <Route
            path={`${PAGE_PATHS.DATA}/always/:customer_id/:channel`}
            component={CollectAlways}
          />
          <Route
            path={`${PAGE_PATHS.DATA}/always/:customer_id/:collect_type/:doc_datetime`}
            component={CollectAlways}
          />

          <Route
            path={`${PAGE_PATHS.DATA}/retroactive`}
            component={CollectRetroactive}
          />
          <Route
            path={`${PAGE_PATHS.DATA}/retroactive/:customer_id/:channel`}
            component={CollectRetroactive}
          />
          <Route
            path={`${PAGE_PATHS.DATA}/retroactive/:customer_id/:collect_type/:doc_datetime`}
            component={CollectRetroactive}
          />

          <Redirect from="/" to={`${PAGE_PATHS.NODE}/nodeStatus`} />
        </Switch>
      </Router>
    );
  }
}
