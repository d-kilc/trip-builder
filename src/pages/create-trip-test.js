import React, { Component } from 'react'
import Geocode from 'react-geocode'

import Layout from '../containers/Layout/Layout'
// import Modal from '../components/UI/Modal/Modal'
import Map from '../components/Map/Map'
import TripBuilder from '../components/TripBuilder/TripBuilder'

import classes from '../page-level-css/create-trip.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateTrip extends Component {
    constructor(props) {
        super(props);
 
        Geocode.setApiKey("AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac")
        Geocode.setLanguage("en")
    
        this.state = { 
            modalVisible: false,
            methods: [ 'Car', 'Bus', 'Train', 'Plane' ],
            segmentCounter: 1,
            segments: [
                {
                    key: 0,
                    cityFrom: {
                        name: '',
                        latitude: null, 
                        longitude: null,
                        mode: null
                    },
                    cityTo: {
                        name: '',
                        latitude: null, 
                        longitude: null,
                        mode: null
                    },
                    date: null
                },
            ]
        }
    } 

    handleEdit = () => {
        this.setState({modalVisible: true})
    }

    handleCancelEdit = () => {
        this.setState({modalVisible: false})
    }

    handleAddSegment = () => {
        let numSegments = this.state.segmentCounter + 1
        let segments = [...this.state.segments]

        segments.push({
            key: numSegments - 1,
            cityFrom: {
                name: '',
                latitude: null, 
                longitude: null,
                mode: null
            },
            cityTo: {
                name: '',
                latitude: null, 
                longitude: null,
                mode: null
            },
            date: null
        })

        this.setState({ segmentCounter: numSegments, segments: segments },
            function () {
              console.log('new segment count: ', this.state.segmentCounter)
              console.log('new segment state: ', this.state.segments)
            }
          ) 
    }

    handleRemoveSegment = (id) => {
        if (this.state.segmentCounter > 1) {
            // copy stops array and remove the given stop
            let numSegments = this.state.segmentCounter - 1
            let segments = [...this.state.segments]
            let idx = segments.findIndex( (el) => { return el.key === id } )
            segments.splice(idx, 1)

            // update the state and print
            this.setState({ segmentCounter: numSegments, segments: segments },
                function () {
                console.log('segment removed--new count: ', this.state.segmentCounter)
                console.log('new segments state: ', this.state.segments)
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

    handleCityFromChange = (e, id) => {
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id })
        segments[idx].cityFrom.name = e.target.value

        // tie this cityFrom to the previous legs cityTo
        // if (id > 0) {

        // }

        // geocoding code -- save for later
        // Geocode.fromAddress(e.target.value).then(
        //     response => {
        //       const { lat, lng } = response.results[0].geometry.location;
        //       newStops[idx].latitude = lat
        //       newStops[idx].longitude = lng
        //       console.log(lat, lng)
        //     },
        //     error => {
        //       console.error(error);
        //     }
        // )

        // update the state and print
        this.setState({ stops: segments },
            function () {
            console.log('new segment count: ', this.state.segmentCounter)
            console.log('new segments state: ', this.state.segments)
            }
        ) 

    }

    handleCityToChange = (e, id) => {
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id })
        segments[idx].cityTo.name = e.target.value

        // if (id > 0) {

        // }

        // update the state and print
        this.setState({ stops: segments },
            function () {
            console.log('new segment count: ', this.state.segmentCounter)
            console.log('new segments state: ', this.state.segments)
            }
        ) 

    }

    handleMethodChange = (e, componentId) => {
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === componentId } )
        segments[idx].mode = e.target.value

        // update the state and print
        this.setState({ segments: segments },
            function () {
                console.log('new segment state: ', this.state.segments)
            }
        ) 
    }

    handleDateChange = (e, id) => {
        // copy stops array and update the specific object with the given date
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id } )
        segments[idx].date = e

        // update the state and print
        this.setState({ segments: segments },
            function () {
            console.log('new segment count: ', this.state.segmentCounter)
            console.log('new segment state: ', this.state.segments)
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
        let stops// = [...this.state.stops]

        return (
            <Layout>
            {/* <Modal hide={this.purchaseCancelHandler} show={this.state.modalVisible}> */}

                <div className={classes.container}>
                    <div className={classes.mapDiv}>
                        <Map
                            handleApiLoaded={this.apiIsLoaded}
                            stopList={stops}/>
                    </div>
                    <div className={classes.controlDiv}>
                        <TripBuilder
                            methods={this.state.methods}
                            segments={this.state.segments}
                            numSegments={this.state.segmentCounter}
                            modalVisible={this.state.modalVisible}
                            handleEdit={this.handleEdit}
                            handleCancelEdit={this.handleCancelEdit}
                            handleAddSegment={this.handleAddSegment}
                            handleRemoveSegment={this.handleRemoveSegment}
                            handleCityFromChange={this.handleCityFromChange}
                            handleCityToChange={this.handleCityToChange}
                            handleDateChange={this.handleDateChange}
                            handleMethodChange={this.handleMethodChange}
                            //   cityChanged={this.handleCityChange}
                            //   stopRemoved={this.handleRemoveStop}
                            //   numStops={this.state.stopCounter}
                            //   addStop={this.handleAddStop}
                            //   generateItinerary={this.handleGenerateItinerary}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}

export default CreateTrip