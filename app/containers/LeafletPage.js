// @flow
import React, { Component } from 'react';
import LeafletComponent from '../components/LeafletComponent';
import TravelDialog from '../components/TravelDialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LeafletActions from '../actions/MapLeaflet';

function mapStateToProps(state) {
  return {
    LeafletComponent: state.addPoint
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LeafletActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletComponent);


