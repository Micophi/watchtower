// @flow

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends Component {
  props: {
    children: HTMLElement
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
