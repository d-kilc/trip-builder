import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

// import Origin from '../Stop/Origin'
import Segment from '../Segment/Segment'

import classes from './TripBuilder.module.css'

class TripBuilder extends Component {
  constructor(props) {
    super(props)
  }
  
  // state = {

  // }

  //debug
    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     const trip = JSON.stringify({
    //         tripName: 'trip X',
    //         segmentCounter: this.props.segmentCounter,
    //         segments: [...this.props.segments]
    //     })

    //     axios.post('/api/trip', trip)
    //         .then((response) => {
    //             console.log('Trip posted from Axios')
    //         })
    //         .catch((e) => {
    //             console.log('error posting to Axios: ', e)
    //         })
        
    // }
  
    render(props) {
        
        var segmentComponents=[]
        for(let i = 0; i < this.props.numSegments - 1; i++){
            // push the component to stops
            console.log('loop')
            segmentComponents.push(
                <Segment
                    key={this.props.segments[i + 1].key}
                    id={this.props.segments[i + 1].key}
                    mapsApi={this.props.mapsApi}
                    mapObj={this.props.mapObj}
                    methods={this.props.methods}
                    modalVisible={this.props.segments[i + 1].modalVisible}
                    updateLocation={this.props.updateLocation}
                    handleEdit={this.props.handleEdit}
                    handleCancelEdit={this.props.handleCancelEdit}
                    handleRemoveSegment={this.props.handleRemoveSegment}
                    handleSaveSegment={this.props.handleSaveSegment}
                    handleCityFromChange={this.props.handleCityFromChange}
                    handleCityToChange={this.props.handleCityToChange}
                    handleDateChange={this.props.handleDateChange}
                    handleMethodChange={this.props.handleMethodChange}
                    handleSelectRoute={this.props.handleSelectRoute}
                    selectedCityFrom={this.props.segments[i + 1].cityFrom}
                    selectedCityTo={this.props.segments[i + 1].cityTo}                
                    selectedDate={this.props.segments[i + 1].date}
                    selectedMode={this.props.segments[i + 1].mode}
                    selectedRoute={this.props.segments[i + 1].directionsRenderer}  
                /> 
            )
        }
        
        return(
            <div className={classes.container}>
                <Segment
                    key={0}
                    id={0}
                    mapsApi={this.props.mapsApi}
                    mapObj={this.props.mapObj}
                    methods={this.props.methods}
                    modalVisible={this.props.segments[0].modalVisible}
                    updateLocation={this.props.updateLocation}
                    handleEdit={this.props.handleEdit}
                    handleCancelEdit={this.props.handleCancelEdit}
                    handleRemoveSegment={this.props.handleRemoveSegment}
                    handleSaveSegment={this.props.handleSaveSegment}
                    handleCityFromChange={this.props.handleCityFromChange}
                    handleCityToChange={this.props.handleCityToChange}
                    handleDateChange={this.props.handleDateChange}
                    handleMethodChange={this.props.handleMethodChange}
                    handleSelectRoute={this.props.handleSelectRoute}
                    selectedCityFrom={this.props.segments[0].cityFrom}
                    selectedCityTo={this.props.segments[0].cityTo}
                    selectedDate={this.props.segments[0].date}
                    selectedMode={this.props.segments[0].mode}
                    selectedRoute={this.props.segments[0].directionsRenderer}
                />
                {segmentComponents}

                <div className={classes.buttonDiv}>
                    <Button variant='primary' onClick={this.props.handleAddSegment}>Add stop</Button>
                    {/* <form onSubmit={this.handleSubmit}>
                        <Button variant='success' type="submit">Save trip</Button>
                    </form> */}
                    {/* <Button variant='success' onClick={this.props.generateItinerary}>Generate route</Button> */}
                </div>
            </div>
        
        )
    }
}
export default TripBuilder