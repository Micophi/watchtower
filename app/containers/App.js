// @flow
import React, { Component, PropTypes } from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
      <MuiThemeProvider  muiTheme={getMuiTheme(lightBaseTheme)}>
   
        {this.props.children}
      </MuiThemeProvider>
      </div>
    );
  }
}
