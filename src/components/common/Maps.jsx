import React, { Component } from "react"
import { compose } from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: 4.6617956, lng: -74.0583487 }}>
        {props.venues.map((venue, index) => {
            const onClick = props.onClick.bind(this, venue)
            return (
                <Marker
                    key={`venue-${index}`}
                    onClick={onClick}
                    position={{ lat: venue.venueLat, lng: venue.venueLon }}
                >
                    {props.selectedMarker === venue &&
            <InfoWindow>
                <div>
                    {venue.venueName}
                </div>
            </InfoWindow>}
                </Marker>
            )
        })}
    </GoogleMap>
))

export default class ShelterMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelters: [],
            selectedMarker: false,
        }
    }
  handleClick = (marker, event) => {
      this.setState({ selectedMarker: marker })
  }
  render() {
      return (
          <MapWithAMarker
              selectedMarker={this.state.selectedMarker}
              venues={this.props.venues}
              onClick={this.handleClick}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div className="responsiveMap" style={{ height: `480px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
          />
      )
  }
}