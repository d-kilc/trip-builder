import React, { Component } from 'react'
import Geocode from 'react-geocode'

import Layout from '../containers/Layout/Layout'
import Map from '../components/Map/Map'
import ControlBox from '../components/ControlBox/ControlBox'

import classes from '../page-level-css/create-trip.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateTrip extends Component {
  constructor(props) {
    super(props);
 
    Geocode.setApiKey("AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac")
    Geocode.setLanguage("en")
    
    this.state = { 
      // mapCenter: {lat: 39.977353, lng: -82.999110},
      modes: [ 'Bus', 'Train', 'Airplane' ],
      // selectedCity: '',
      // selectedOption: null,
      // startDate: new Date(),
      stopCounter: 0,
      stops: [
        {key: 'start', city: '', latitude: null, longitude: null, mode: null, date: null},
        {key: 'end', city: '', latitude: null, longitude: null, mode: null, date: null},
      ]
    }
  } 

  handleAddStop = () => {
    console.log('click')
    // add the stop
    let numStops = this.state.stopCounter + 1
    let newStops = [...this.state.stops]

    newStops.splice(
      numStops, 0, {key: numStops, city: '', latitude: null, longitude: null, mode: null, date: null}
    )
    // update the state and print
    this.setState({ stopCounter: numStops, stops: newStops },
      function () {
        console.log('new stop count: ', this.state.stopCounter)
        console.log('new stops state: ', this.state.stops)
      }
    )    
  }

  handleRemoveStop = (id) => {
    console.log('clack')
    if (this.state.stopCounter > 0) {
      // copy stops array and remove the given stop
      let numStops = this.state.stopCounter - 1
      let newStops = [...this.state.stops]
      let idx = newStops.findIndex( (el) => { return el.key === id } )
      newStops.splice(idx, 1)

      // update the state and print
      this.setState({ stopCounter: numStops, stops: newStops },
        function () {
          console.log('new stop count: ', this.state.stopCounter)
          console.log('new stops state: ', this.state.stops)
        }
      )
    }   
  }

  apiIsLoaded = (map, maps) => {
    console.log('api loaded')
  
    // mapObj is the instance on the page; mapsApi is the GMaps API service
    this.setState({mapObj: map, mapsApi: maps},
      function() {
        console.log(this.state.mapObj)
        console.log(this.state.mapsApi)
      }
    )
  }

  handleCityChange = (e, id) => {
    // copy stops array and update the specific object with the given city
    let newStops = [...this.state.stops]
    let idx = newStops.findIndex( (el) => { return el.key === id } )
    newStops[idx].city = e.target.value

    
    Geocode.fromAddress(e.target.value).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        newStops[idx].latitude = lat
        newStops[idx].longitude = lng
        console.log(lat, lng)
      },
      error => {
        console.error(error);
      }
    )

    // update the state and print
    this.setState({ stops: newStops },
      function () {
        console.log('new stop count: ', this.state.stopCounter)
        console.log('new stops state: ', this.state.stops)
      }
    ) 
  }

  handleModeChange = (e, componentId) => {     
    // copy stops array and update the specific object with the given city
    let newStops = [...this.state.stops]
    let idx = newStops.findIndex( (el) => { return el.key === componentId } )
    newStops[idx].mode = e

    // update the state and print
    this.setState({ stops: newStops },
      function () {
        console.log('new stop count: ', this.state.stopCounter)
        console.log('new stops state: ', this.state.stops)
      }
    ) 
  }

  handleDateSelect = (e, id) => {
    // copy stops array and update the specific object with the given date
    let newStops = [...this.state.stops]
    let idx = newStops.findIndex( (el) => { return el.key === id } )
    newStops[idx].date = e
 
    // update the state and print
    this.setState({ stops: newStops },
      function () {
        console.log('new stop count: ', this.state.stopCounter)
        console.log('new stops state: ', this.state.stops)
      }
    ) 
  }

  handleGenerateItinerary = () => {
    let map = this.state.mapObj
    let maps = this.state.mapsApi
    // console.log(map, maps)
    let directionsService = new maps.DirectionsService()
    // console.log(directionsService)

    let stops = this.state.stops
    console.log('stops: ', stops.length)
    // the intermediate stops used to build the route
    let waypts = []

    // loop through the intermediate stops - not the startpoint or endpoint, just the locations between
    // push these to the waypts object, which will be passed to directionsRequest below to determine the route
    for (let i = 1; i <= (stops.length - 2); i++) {
      if (stops[i].latitude === null || stops[i].longitude === null ) continue
      waypts.push({
        location: {lat: stops[i].latitude, lng: stops[i].longitude},
        stopover: true
      })
    }
    console.log('waypts: ',waypts)
    
    let directionsRequest = {
      origin: new maps.LatLng( stops[0].latitude, stops[0].longitude ),
      waypoints: waypts,
      destination: new maps.LatLng( stops[stops.length - 1].latitude, stops[stops.length - 1].longitude ),
      travelMode: maps.DirectionsTravelMode.DRIVING,
      unitSystem: maps.UnitSystem.METRIC
    }

    // create the route
    directionsService.route(
      directionsRequest,
      function(response, status) {
        if (status == maps.DirectionsStatus.OK) {
          new maps.DirectionsRenderer({
            map: map,
            directions: response
          })
        } 
        // else $("#error").append("Unable to retrieve your route<br />")
      }
    )
  }

  render(props) {
    console.log('mapframe rendered')
    let stops = [...this.state.stops]

    return (
      <Layout>
        <div className={classes.container}>
          <div className={classes.mapDiv}>
            <Map
              handleApiLoaded={this.apiIsLoaded}
              stopList={stops}/>
          </div>
          <div className={classes.controlDiv}>
            <ControlBox
              modes={this.state.modes}
              stops={this.state.stops}
              dateChanged={this.handleDateSelect}
              modeChanged={this.handleModeChange}
              cityChanged={this.handleCityChange}
              stopRemoved={this.handleRemoveStop}
              numStops={this.state.stopCounter}
              addStop={this.handleAddStop}
              generateItinerary={this.handleGenerateItinerary}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default CreateTrip