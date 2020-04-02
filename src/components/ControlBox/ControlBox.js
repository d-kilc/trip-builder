import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import Origin from '../Stop/Origin'
import Stop from '../Stop/Stop'

import classes from './ControlBox.module.css'

class ControlBox extends Component {
  constructor(props) {
    super(props)
  }
  
  // state = {

  // }
  
  render(props) {

    console.log(this.props.stops)
    console.log('control box rendered')
    var stopComponents=[]
    for(let i = 0; i < this.props.numStops; i++){
      // push the component to stops
      console.log('loop')
      stopComponents.push(
        <Stop
          // className={classes.Stop}
          key={ i + 1 }
          id={ i + 1 }
          modes={this.props.modes}            
          stops={this.props.stops}
          
          selectedMode={this.props.stops[i + 1].mode}
          selectedDate={this.props.stops[i + 1].date}
          selectedCity={this.props.stops[i + 1].city}

          dateChanged={this.props.dateChanged}
          modeChanged={this.props.modeChanged}
          cityChanged={this.props.cityChanged}
          stopRemoved={this.props.stopRemoved}
        /> 
      )
    }
      
    return(
      <div className={classes.container}>     
        <Origin
          key={'start'}
          id={'start'}
          modes={this.props.modes}
          selectedCity={this.props.stops[0].city}
          dateChanged={this.props.dateChanged}
          modeChanged={this.props.modeChanged}
          cityChanged={this.props.cityChanged} 
        />
        {stopComponents}
        <Stop
          key={'end'}
          id={'end'}
          modes={this.props.modes}
          stops={this.props.stops}
          selectedMode={this.props.stops[this.props.stops.length - 1].mode}
          selectedDate={this.props.stops[this.props.stops.length - 1].date}
          selectedCity={this.props.stops[this.props.stops.length - 1].city}
          dateChanged={this.props.dateChanged}
          modeChanged={this.props.modeChanged}
          cityChanged={this.props.cityChanged}
        />
        <div className={classes.buttonDiv}>
          <Button variant='primary' onClick={this.props.addStop}>Add stop</Button>
          <Button variant='success' onClick={this.props.generateItinerary}>Generate route</Button>
        </div>
      </div>
      
    )
  }
}
export default ControlBox