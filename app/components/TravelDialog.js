// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Style from './TravelDialog.css'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 * check : https://github.com/vlad-ignatov/react-numeric-input
 */
export default class TravelDialog extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      latitudeDepart: 0.0,
      longitudeDepart: 0.0,
      latitudeDestination: 0.0,
      longitudeDestination: 0.0,
    };

  }

  
  handleOpen = () => {
    this.setState({open: true});
  };

 handleLatitudeDepartChange = (event) => {
    this.setState({
      latitudeDepart: event.target.value,
      longitudeDepart: this.state.longitudeDepart,
    });
  };

  handleLongitudeDepartChange = (event) => {
    this.setState({
      latitudeDepart: this.state.latitudeDepart,
      longitudeDepart: event.target.value,
    });
  };

   handleLatitudeDestinationChange = (event) => {
    this.setState({
      latitudeDestination: event.target.value,
    });
  };

  handleLongitudeDestinationChange = (event) => {
    this.setState({
      longitudeDestination: event.target.value,
    });
  };

  handleClose = () => {
    var latlngDepart = this.props.getLatLng(this.state.latitudeDepart, this.state.longitudeDepart);
    var latlngDestination = this.props.getLatLng(this.state.latitudeDestination, this.state.longitudeDestination);
    var path = this.props.getCurvedPath(latlngDepart,latlngDestination);

    path.addTo(this.props.map);
    this.setState({open: false});
  };


  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <FloatingActionButton onTouchTap={this.handleOpen} className={Style.floatingbutton}>
        <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add a travel path"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField
          id="Latitude depart"
          hintText="Latitude depart"
          floatingLabelText="Latitude depart"
          value={this.state.latitudeDepart}
          onChange={this.handleLatitudeDepartChange}
          type='number'
        />
        <TextField
          id="Longitude depart"
          hintText="Longitude depart"
          floatingLabelText="Longitude depart"
          value={this.state.longitudeDepart}
          onChange={this.handleLongitudeDepartChange}
          type='number'
        />
        <TextField
          id="Latitude destination"
          hintText="Latitude destination"
          floatingLabelText="Latitude destination"
          value={this.state.latitudeDestination}
          onChange={this.handleLatitudeDestinationChange}
          type='number'
        />
        <TextField
          id="Longitude destination"
          hintText="Longitude destination"
          floatingLabelText="Longitude destination"
          value={this.state.longitudeDestination}
          onChange={this.handleLongitudeDestinationChange}
          type='number'
        />
        </Dialog>
      </div>
    );
  }
}