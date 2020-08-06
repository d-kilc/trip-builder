import React, { Component } from 'react'
import Geocode from 'react-geocode'
import assign from 'lodash/assign'

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
            // methods: [ 'Car', 'Bus', 'Train', 'Plane' ],
            methods: [ 'Car'],
            segmentCounter: 1,
            segments: [
                {
                    key: 0,
                    cityFrom: {
                        name: '',
                        location: null, //LatLngLiteral type
                        marker: null
                    },
                    cityTo: {
                        name: '',
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
    

    ////////////////////////////////////end helper functions
    
    updateLocation = (id, location, toOrFrom) => {
        // this fn will help the previewRoutes fn in ResultsPanel geocode the user input
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id })
        //console.log('segment idx: ', idx)

        if(toOrFrom === 'from') {
            segments[idx].cityFrom.location = location
        } else if (toOrFrom === 'to') {
            segments[idx].cityTo.location = location
        }

        this.setState( { segments: segments }, function () {
            console.log('segments with locations: ', this.state.segments)
        } )
    }


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
                location: {...segments[numSegments - 2].cityTo.location}
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
            if (segments[idx].cityFrom.marker) segments[idx].cityFrom.marker.setMap(null)
            if (segments[idx].cityTo.marker) segments[idx].cityTo.marker.setMap(null)
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

        // // now, geocode the address and then store the location in state too
        // // don't geocode if its an empty string
        // if (segments[idx].cityFrom.name.length > 2) {
        //     let geocoder = new this.state.mapsApi.Geocoder()
        //     geocoder.geocode({address: segments[idx].cityFrom.name}, (res, status) => {
        //         if (status !== 'OK') return console.log('status: ', status)
        //         const locTo = res[0].geometry.location.toJSON()
        //         segments[idx].cityFrom.location = locTo

        //         // update the state and print
        //         this.setState({ segments: segments },
        //             function () {
        //                 console.log('new segments state: ', this.state.segments)
        //             }
        //         ) 
        //     })
        // }
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

        // // now, geocode the address and then store the location in state too
        // // don't geocode if its an empty string
        // if (segments[idx].cityTo.name.length > 2) {
        //     let geocoder = new this.state.mapsApi.Geocoder()
        //     geocoder.geocode({address: segments[idx].cityTo.name}, (res, status) => {
        //         if (status !== 'OK') return console.log('status: ', status)
        //         const locTo = res[0].geometry.location.toJSON()
        //         segments[idx].cityTo.location = locTo

        //         // update the state and print
        //         this.setState({ segments: segments },
        //             function () {
        //                 console.log('new segments state: ', this.state.segments)
        //             }
        //         ) 
        //     })
        // }
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

    handleSelectRoute = (response, routeIndex , id) => {
        let map = this.state.mapObj
        let maps = this.state.mapsApi
        
        // copy stops array and update the specific object with the given route
        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id } )

        // clear the previously selected route from the map, if there was one
        if (segments[idx].directionsRenderer) {
            segments[idx].directionsRenderer.setMap(null)
        }

        // create a new directionsrenderer for the main map
        // based on whatever the user clicked
        segments[idx].directionsRenderer = new maps.DirectionsRenderer({suppressMarkers: true})

        segments[idx].directionsRenderer.setDirections(response)
        segments[idx].directionsRenderer.setRouteIndex(routeIndex)
        segments[idx].directionsRenderer.setMap(map)

        this.setState({ segments: segments },
            function () {
                // console.log('new segment count: ', this.state.segmentCounter)
                console.log('new segment state: ', this.state.segments)
            })
    }

    handleSaveSegment = (id) => {
        let map = this.state.mapObj
        let maps = this.state.mapsApi
        console.log('map:', map, 'maps API: ', maps)

        let segments = [...this.state.segments]
        let idx = segments.findIndex( (el) => { return el.key === id } )

        // create the origin marker
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
        })

        // create the destination marker
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
        })

        // renderer was passed in handleSelectRoute()
        // now we actually bind that renderer to the big map and close the modal
        // segments[idx].directionsRenderer.setMap(map)
        segments[idx].directionsRenderer.map = map
        this.handleCancelEdit(id)
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
                            updateLocation={this.updateLocation}
                            handleEdit={this.handleEdit}
                            handleCancelEdit={this.handleCancelEdit}
                            handleAddSegment={this.handleAddSegment}
                            handleRemoveSegment={this.handleRemoveSegment}
                            handleSaveSegment={this.handleSaveSegment}
                            handleCityFromChange={this.handleCityFromChange}
                            handleCityToChange={this.handleCityToChange}
                            handleDateChange={this.handleDateChange}
                            handleMethodChange={this.handleMethodChange}
                            handleSelectRoute={this.handleSelectRoute}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}

export default CreateTrip