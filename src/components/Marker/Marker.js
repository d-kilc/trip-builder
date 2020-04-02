import React, { Component } from 'react'

const Marker = (props) => {
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: 'blue',
        cursor: 'pointer',
        zIndex: 10,
    }
    
      return (
        <React.Fragment>
          <div style={markerStyle} />
          {/* {props.show && <InfoWindow place={props.place} />} */}
        </React.Fragment>
      )
}

 export default Marker