// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import CounterPage from './containers/CounterPage';
import LeafletPage from './containers/LeafletPage'
import CesiumPage from './containers/CesiumPage';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={LeafletPage} />
    <Route path="/counter" component={CounterPage} />
    <Route path="/cesium" component={CesiumPage} />
    <Route path="/leaflet" component={LeafletPage} />
  </Route>
);
