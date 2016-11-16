import React from 'react';
import BuildModuleUrl from 'cesium/Source/Core/buildModuleUrl';
BuildModuleUrl.setBaseUrl('./');
import CesiumViewer from 'cesium/Source/Widgets/Viewer/Viewer';
// import Entity from 'cesium/Source/DataSources/Entity';
// import CesiumPatcher from './cesium.patcher.js';
// import Cartesian3 from 'cesium/Source/Core/Cartesian3';
import './CesiumComponent.css';

let cesiumViewerOptions = {
    animation: true,
    baseLayerPicker: true,
    fullscreenButton: true,
    geocoder: true,
    homeButton: true,
    infoBox: true,
    sceneModePicker: true,
    selectionIndicator: true,
    timeline: true,
    navigationHelpButton: true,
    navigationInstructionsInitiallyVisible: true,
    automaticallyTrackDataSourceClocks: true
};

class CesiumComponent extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        // Create the Cesium Viewer
        this.viewer = new CesiumViewer(this.refs.map, cesiumViewerOptions);

        // // Add the initial points
        // this.props.cities.forEach((city) => {
        //     this.viewer.entities.add(new Entity({
        //         id: city.id,
        //         show: city.visible,
        //         position: new Cartesian3.fromDegrees(city.longitude, city.latitude),
        //         billboard: {
        //             image: require('../../public/images/pin.svg'),
        //             width: 30,
        //             height: 30
        //         }
        //     }));
        // });
    }

    render() {
        return (
            <div ref="map">
            </div>
        );
    }
}

export default CesiumComponent;