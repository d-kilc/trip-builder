import React from 'react'
import GoogleMapReact from 'google-map-react'

import Marker from '../Marker/Marker'

const defaultProps = {
    center: {
      lat: 39.95,
      lng: -82.99
    },
    zoom: 5
  }

const googleMap = (props) => (
    <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac', language: 'en' }}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => props.handleApiLoaded(map, maps)}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
            {/* {props.stopList.map(stop =>
                (<Marker
                    key={stop.id}
                    lat={stop.latitude}
                    lng={stop.longitude}
                    // show={stop.show}
                    // stop={stop}
                />))} */}
    </GoogleMapReact>
)

export default googleMap