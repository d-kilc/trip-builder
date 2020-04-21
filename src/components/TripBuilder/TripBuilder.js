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
                    key={ i + 1 }
                    id={ i + 1 }
                    methods={this.props.methods}
                    modalVisible={this.props.modalVisible}
                    handleEdit={this.props.handleEdit}
                    handleCancelEdit={this.props.handleCancelEdit}
                    handleRemoveSegment={this.props.handleRemoveSegment}
                    handleCityFromChange={this.props.handleCityFromChange}
                    handleCityToChange={this.props.handleCityToChange}
                    handleDateChange={this.props.handleDateChange}
                    handleMethodChange={this.props.handleMethodChange}
                    selectedCityFrom={this.props.segments[i + 1].cityFrom.name}
                    selectedCityTo={this.props.segments[i + 1].cityTo.name}                
                    selectedDate={this.props.segments[i + 1].date}     
                    //   stops={this.props.stops}
                    
                    //   selectedMode={this.props.stops[i + 1].mode}
                    //   selectedDate={this.props.stops[i + 1].date}
                    //   selectedCity={this.props.stops[i + 1].city}

                    //   dateChanged={this.props.dateChanged}
                    //   modeChanged={this.props.modeChanged}
                    //   cityChanged={this.props.cityChanged}
                    //   stopRemoved={this.props.stopRemoved}
                /> 
            )
        }
        
        return(
            <div className={classes.container}>     
                <Segment
                    key={0}
                    id={0}
                    methods={this.props.methods}
                    modalVisible={this.props.modalVisible}
                    handleEdit={this.props.handleEdit}
                    handleCancelEdit={this.props.handleCancelEdit}
                    handleRemoveSegment={this.props.handleRemoveSegment}
                    handleCityFromChange={this.props.handleCityFromChange}
                    handleCityToChange={this.props.handleCityToChange}
                    handleDateChange={this.props.handleDateChange}
                    handleMethodChange={this.props.handleMethodChange}
                    selectedCityFrom={this.props.segments[0].cityFrom.name}
                    selectedCityTo={this.props.segments[0].cityTo.name}
                    selectedDate={this.props.segments[0].date}
                    //   stops={this.props.stops}
                    //   selectedMode={this.props.stops[this.props.stops.length - 1].mode}
                    //   selectedCity={this.props.stops[this.props.stops.length - 1].city}
                    //   dateChanged={this.props.dateChanged}
                    //   modeChanged={this.props.modeChanged}
                    //   cityChanged={this.props.cityChanged}
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