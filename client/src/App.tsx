import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import 'bootstrap/dist/css/bootstrap.css';
import '~css/style.css';

import { STORES, PAGE_PATHS } from '~constants';
import CollectCount from '~pages/CollectCount';
import NodeCollector from '~pages/NodeCollector';
import DmapCollector from '~pages/DmapCollector';
import CollectRetroactive from '~pages/CollectRetroactive';
import CollectAlways from '~pages/CollectAlways';

@inject(STORES.NODE_STORE)
@inject(STORES.DMAP_STORE)
@inject(STORES.VERIFY_STORE)
@observer
@autobind
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={`${PAGE_PATHS.NODE}/:kind/:collapsed`}
            component={NodeCollector}
          />
          <Route
            path={`${PAGE_PATHS.NODE}/:kind/:request_seq`}
            component={NodeCollector}
          />

          <Route
            path={`${PAGE_PATHS.DMAP}/:kind/:collapsed`}
            component={DmapCollector}
          />
          <Route
            path={`${PAGE_PATHS.DMAP}/:kind/:project_seq`}
            component={DmapCollector}
          />

          <Route
            path={`${PAGE_PATHS.COUNT}/:collapsed`}
            component={CollectCount}
          />
          <Route
            path={`${PAGE_PATHS.COUNT}/:customer_id/:always_yn`}
            component={CollectCount}
          />

          {/* <Route path={`${PAGE_PATHS.DATA}/always`} component={CollectAlways} /> */}
          <Route
            path={`${PAGE_PATHS.DATA}/always/:collapsed`}
            component={CollectAlways}
          />
          <Route
            path={`${PAGE_PATHS.DATA}/always/:customer_id/:channel`}
            component={CollectAlways}
          />

          <Route
            path={`${PAGE_PATHS.DATA}/retroactive/:collapsed`}
            component={CollectRetroactive}
          />
          <Route
            path={`${PAGE_PATHS.DATA}/retroactive/getCustomers`}
            component={CollectRetroactive}
          />
          <Route
            path={`${PAGE_PATHS.DATA}/retroactive/:customer_id/:channel`}
            component={CollectRetroactive}
          />

          <Redirect from="/" to={`${PAGE_PATHS.NODE}/nodeStatus/false`} />
        </Switch>
      </Router>
    );
  }
}
