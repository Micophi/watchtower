// @flow
import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import styles from './ToolbarComponent.css';
import Paper from 'material-ui/Paper';

export default class ToolbarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }
 handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value,
    });
  };

  handleChangeMultiple = (event, value) => {
    this.setState({
      valueMultiple: value,
    });
  };

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }
  handleChange = (event, index, value) => this.setState({value});

  searchBoxChange = (event) =>{
    console.log(event);
  }


  render() {
    return (
      <Paper className={styles.paperBox} zDepth={4} >
        <Toolbar className={styles.globalToolbar}>
          <ToolbarGroup firstChild={true}>
            <TextField
              onChange={this.searchBoxChange}
              className={styles.globalToolbar}
              hintText="Search..."
              onKeyPress={this.searchBoxChange}
              />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              onChange={this.handleChangeSingle}
              value={this.state.valueSingle}
            >
            <MenuItem value="1" primaryText="Refresh" />
            <MenuItem value="2" primaryText="Send feedback" />
            <MenuItem value="3" primaryText="Settings" />
            <MenuItem value="4" primaryText="Help" />
            <MenuItem value="5" primaryText="Sign out" />
          </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}