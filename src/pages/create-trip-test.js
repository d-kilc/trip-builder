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
                        // latitude: null, 
                        // longitude: null,
                        location: null //LatLngLiteral type
                    },
                    cityTo: {
                        name: '',
                        // latitude: null, 
                        // longitude: null,
                        location: null //LatLngLiteral type
                    },
                    date: null,
                    mode: null,
                    directionsRenderer: null
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
            date: null,
            mode: null,
            routeRendered: false
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
        this.setState({mapObj: map, mapsApi: maps}
            // ,
            // function() {
            //     console.log(this.state.mapObj)
            //     console.log(this.state.mapsApi)
            // }
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

    handleSaveSegment = (id) => {
        let map = this.state.mapObj
        let maps = this.state.mapsApi
        console.log('map:', map, 'maps API: ', maps)
        
        //geocode the selected locations and update state so we can map
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id } )

        let geocoder = new maps.Geocoder()
        let directionsService = new maps.DirectionsService()

        //either get this segment's renderer, or create a new one if there isnt one yet
        let directionsRenderer
        !this.state.segments[idx].directionsRenderer ?
            directionsRenderer = new maps.DirectionsRenderer()
        :
            directionsRenderer = this.state.segments[idx].directionsRenderer
        
        segments[idx].directionsRenderer = directionsRenderer

        function geoCodeAddress(address) {
            // return a Promise
            return new Promise(function(resolve, reject) {
                geocoder.geocode({ address: address }, function(results, status) {
                    // if (status == maps.GeocoderStatus.OK) {
                    if (status == 'OK') {
                        // resolve results upon a successful status
                        resolve(results);
                    } else {
                        // reject status upon un-successful status
                        reject(status);
                    }
                });
            });
        }

        function mapLocation(origin, destination) {
            // return a Promise
            return new Promise(function(resolve, reject) {
                directionsService.route({
                    // origin: segments[idx].cityFrom.location,
                    // destination: segments[idx].cityTo.location,
                    origin: origin,
                    destination: destination,
                    travelMode: 'DRIVING'
                }, function(results, status) {
                    // if (status == maps.GeocoderStatus.OK) {
                    if (status == 'OK') {
                        // resolve results upon a successful status
                        resolve(results);
                    } else {
                        // reject status upon un-successful status
                        reject(status);
                    }
                });
            });
        }

        geoCodeAddress(segments[idx].cityFrom.name)
            .then(res => {
                console.log('geocodeAddress 1 then')
                const locFrom = res[0].geometry.location.toJSON()
                segments[idx].cityFrom.location = locFrom

                //update state
                this.setState( {segments: segments},
                    function() {
                        console.log('segments with locations: ', this.state.segments)
                    }    
                )
                return
            })
            .then(() => {
                return geoCodeAddress(segments[idx].cityTo.name)
            })
            .then(res => {
                console.log('geocodeAddress 2 then')
                const locTo = res[0].geometry.location.toJSON()
                segments[idx].cityTo.location = locTo

                //update state
                this.setState( {segments: segments},
                    function() {
                        console.log('segments with locations: ', this.state.segments)
                    }    
                )
                return
            })
            .then(() => {
                return mapLocation(this.state.segments[idx].cityFrom.location, this.state.segments[idx].cityTo.location)
            })
            .then((res) => {
                console.log('mapAddress then 1')
                directionsRenderer.setDirections(res)
                directionsRenderer.setMap(map)
            })
            .then(() => this.handleCancelEdit())
            .catch(err => console.log(err))

    }

    render(props) {
        let stops// = [...this.state.stops]

        return (
            <Layout>

                <div className={classes.container}>
                    <div className={classes.mapDiv}>
                        <Map
                            handleApiLoaded={this.apiIsLoaded}
                            segments={this.state.segments}
                        />
                    </div>
                    <div className={classes.controlDiv}>
                        <TripBuilder
                            mapsApi={this.state.mapsApi}
                            mapObj={this.state.mapObj}
                            methods={this.state.methods}
                            segments={this.state.segments}
                            numSegments={this.state.segmentCounter}
                            modalVisible={this.state.modalVisible}
                            handleEdit={this.handleEdit}
                            handleCancelEdit={this.handleCancelEdit}
                            handleAddSegment={this.handleAddSegment}
                            handleRemoveSegment={this.handleRemoveSegment}
                            handleSaveSegment={this.handleSaveSegment}
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