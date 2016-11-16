// @flow
import { combineReducers } from 'redux'
import { ADD_POINT } from '../actions/MapLeaflet'

export default function ModifyMap(state: text = "", action: Object) {
  switch (action.type) {
    case ADD_POINT:
      console.log(state);
      return state + action.text;
    default:
      return state;
  }
}