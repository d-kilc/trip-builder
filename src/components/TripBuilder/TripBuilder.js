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
  
    render(props) {
        
        // console.log(this.props.segments)
        console.log('tripbuilder rendered')
        var segmentComponents=[]
        for(let i = 0; i < this.props.numSegments - 1; i++){
            // push the component to stops
            console.log('loop')
            segmentComponents.push(
                <Segment
                    key={this.props.segments[i + 1].key}
                    // id={ i + 1 }
                    id={this.props.segments[i + 1].key}
                    mapsApi={this.props.mapsApi}
                    mapObj={this.props.mapObj}
                    methods={this.props.methods}
                    modalVisible={this.props.segments[i + 1].modalVisible}
                    handleEdit={this.props.handleEdit}
                    handleCancelEdit={this.props.handleCancelEdit}
                    handleRemoveSegment={this.props.handleRemoveSegment}
                    handleSaveSegment={this.props.handleSaveSegment}
                    handleCityFromChange={this.props.handleCityFromChange}
                    handleCityToChange={this.props.handleCityToChange}
                    handleDateChange={this.props.handleDateChange}
                    handleMethodChange={this.props.handleMethodChange}
                    selectedCityFrom={this.props.segments[i + 1].cityFrom}
                    selectedCityTo={this.props.segments[i + 1].cityTo}                
                    selectedDate={this.props.segments[i + 1].date}
                    selectedMode={this.props.segments[i + 1].mode}  
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
                    handleEdit={this.props.handleEdit}
                    handleCancelEdit={this.props.handleCancelEdit}
                    handleRemoveSegment={this.props.handleRemoveSegment}
                    handleSaveSegment={this.props.handleSaveSegment}
                    handleCityFromChange={this.props.handleCityFromChange}
                    handleCityToChange={this.props.handleCityToChange}
                    handleDateChange={this.props.handleDateChange}
                    handleMethodChange={this.props.handleMethodChange}
                    selectedCityFrom={this.props.segments[0].cityFrom}
                    selectedCityTo={this.props.segments[0].cityTo}
                    selectedDate={this.props.segments[0].date}
                    selectedMode={this.props.segments[0].mode}
                />
                {segmentComponents}

                <div className={classes.buttonDiv}>
                    <Button variant='primary' onClick={this.props.handleAddSegment}>Add stop</Button>
                    <Button variant='success' onClick={this.props.generateItinerary}>Generate route</Button>
                </div>
            </div>
        
        )
    }
}
export default TripBuilder