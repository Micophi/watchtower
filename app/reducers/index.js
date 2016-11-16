// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import MapLeaflet from './MapLeaflet';

const rootReducer = combineReducers({
  counter,
  MapLeaflet,
  routing
});

export default rootReducer;
