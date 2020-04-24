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
            methods: [ 'Car', 'Bus', 'Train', 'Plane' ],
            segmentCounter: 1,
            segments: [
                {
                    key: 0,
                    cityFrom: {
                        name: '',
                        // latitude: null, 
                        // longitude: null,
                        location: null, //LatLngLiteral type
                        marker: null
                    },
                    cityTo: {
                        name: '',
                        // latitude: null, 
                        // longitude: null,
                        location: null, //LatLngLiteral type
                        marker: null
                    },
                    date: null,
                    mode: null,
                    directionsRenderer: null,
                    modalVisible: false,
                },
            ]
        }
    } 
    ////////////////////////////////////////////helper functions
    geoCodeAddress = (address) => {
        let maps = this.state.mapsApi
        let geocoder = new maps.Geocoder()

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

    
    mapLocation = (origin, destination) => {
        let maps = this.state.mapsApi
        let directionsService = new maps.DirectionsService()

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

    ////////////////////////////////////end helper functions

    handleEdit = (id) => {
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id })
        segments[idx].modalVisible = true
        
        this.setState({segments: segments},
            function () {
                console.log('new segment count: ', this.state.segmentCounter)
                console.log('new segment state: ', this.state.segments)
            }
          )
    }

    handleCancelEdit = (id) => {
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id })
        segments[idx].modalVisible = false
        
        this.setState({segments: segments},
            function () {
                console.log('new segment count: ', this.state.segmentCounter)
                console.log('new segment state: ', this.state.segments)
            }
          )
    }

    handleAddSegment = () => {
        let numSegments = this.state.segmentCounter + 1
        let segments = [...this.state.segments]

        segments.push({
            key: segments[numSegments - 2].key + 1,
            cityFrom: {
                name: segments[numSegments - 2].cityTo.name,
                location: null
            },
            cityTo: {
                name: '',
                location: null
            },
            date: null,
            mode: null,
            directionsRenderer: null,
            modalVisible: false
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
            
            //set directionsRenderer to null if it exists (before splicing the segment off) to remove the route from the map
            //setMap(null) for the markers to removet them as well
            if (segments[idx].directionsRenderer) segments[idx].directionsRenderer.setMap(null)
            segments[idx].cityFrom.marker.setMap(null)
            segments[idx].cityTo.marker.setMap(null)
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

        // update the state so we can update the UI as the user types
        // before geocoding
        this.setState({ segments: segments },
            function () {
                console.log('new segments state: ', this.state.segments)
            }
        ) 

        // now, geocode the address and then store the location in state too
        let geocoder = new this.state.mapsApi.Geocoder()
        geocoder.geocode({address: segments[idx].cityFrom.name}, (res, status) => {
            if (status !== 'OK') return console.log('status: ', status)
            const locTo = res[0].geometry.location.toJSON()
            segments[idx].cityFrom.location = locTo

            // update the state and print
            this.setState({ segments: segments },
                function () {
                    console.log('new segments state: ', this.state.segments)
                }
            ) 
        })
    }

    handleCityToChange = (e, id) => {
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id })
        segments[idx].cityTo.name = e.target.value

        // update the state so we can update the UI as the user types
        // before geocoding
        this.setState({ segments: segments },
            function () {
                console.log('new segments state: ', this.state.segments)
            }
        ) 

        // now, geocode the address and then store the location in state too
        let geocoder = new this.state.mapsApi.Geocoder()
        geocoder.geocode({address: segments[idx].cityTo.name}, (res, status) => {
            if (status !== 'OK') return console.log('status: ', status)
            const locTo = res[0].geometry.location.toJSON()
            segments[idx].cityTo.location = locTo

            // update the state and print
            this.setState({ segments: segments },
                function () {
                    console.log('new segments state: ', this.state.segments)
                }
            ) 
        })

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

        //either get this segment's renderer, or create a new one if there isnt one yet
        let directionsRenderer
        let rendererOptions = {
            suppressMarkers: true
        }
        !this.state.segments[idx].directionsRenderer ?
            directionsRenderer = new maps.DirectionsRenderer(rendererOptions)
        :
            directionsRenderer = this.state.segments[idx].directionsRenderer
        
        this.mapLocation(segments[idx].cityFrom.location, segments[idx].cityTo.location)
            .then((res) => {
                //get the response and render the route with custom markers
                console.log('mapAddress then 1')
                directionsRenderer.setDirections(res)
                directionsRenderer.setMap(map)
                
                segments[idx].cityFrom.marker = new maps.Marker({
                    position: segments[idx].cityFrom.location,
                    icon: {
                        path: maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#F00",
                        fillOpacity: 1,
                        strokeWeight: 1
                    },
                    map: map
                });

                segments[idx].cityTo.marker = new maps.Marker({
                    position: segments[idx].cityTo.location,
                    icon: {
                        path: maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#F00",
                        fillOpacity: 1,
                        strokeWeight: 1
                    },
                    map: map
                  });

                return directionsRenderer
            })
            .then((directionsRenderer) => {
                //close the modal and update the state
                //store the updated directionsRenderer in state so we can remove the route if needed in the future (by setting it back to null)
                this.handleCancelEdit(id)
                segments[idx].directionsRenderer = directionsRenderer
                
                //update state with the updated
                this.setState( {segments: segments},
                    function() {
                        console.log('segments with locations: ', this.state.segments)
                    }    
                )

            })
            .catch(err => console.log(err))

    }

    render(props) {
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
                            handleEdit={this.handleEdit}
                            handleCancelEdit={this.handleCancelEdit}
                            handleAddSegment={this.handleAddSegment}
                            handleRemoveSegment={this.handleRemoveSegment}
                            handleSaveSegment={this.handleSaveSegment}
                            handleCityFromChange={this.handleCityFromChange}
                            handleCityToChange={this.handleCityToChange}
                            handleDateChange={this.handleDateChange}
                            handleMethodChange={this.handleMethodChange}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}

export default CreateTrip