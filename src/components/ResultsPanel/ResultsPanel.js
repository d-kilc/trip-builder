import React, { Suspense } from "react"
import { unstable_createResource } from 'react-cache'
import { Table, Button } from 'react-bootstrap'

import Map from '../Map/Map'
import Loader from '../UI/Loader/Loader'
import { calculateEstCost } from '../../utils/budgeting/budgeting'

import classes from "./ResultsPanel.module.css"

class ResultsPanel extends React.Component {
    state = {
        from: null,
        to: null,
        resultsPanelMap: null,
        mainMap: null,
        renderedRoutes: [], // these will contain the directionsRenderer objects which draw the routes on the map
        Routes: null, // these are the <tr> components
        previewVisible: false, // controls whether the table w/ route options is visible
        maps: null, // this is the API object
        selected: null,
        mapsApi: null,
        isLoading: false,
    }

    componentDidMount = (props) => {
        this.setState({mapsApi: this.props.mapsApi}, () => {
            console.log('Google API added to state')
        })
    }

    codeAddresses = (callback) => {
        let geocoder = new this.props.mapsApi.Geocoder()
        geocoder.geocode({address: this.props.selectedCityFrom.name}, (res, status) => {
            if (status !== 'OK') return console.log('geocode status: ', status)
            const locFrom = res[0].geometry.location.toJSON()
    
            //update state (see create-trip.js)
            this.props.updateLocation(this.props.segmentId, locFrom, 'from')
            console.log('locFrom received')
            
            geocoder.geocode({address: this.props.selectedCityTo.name}, (res, status) => {
                if (status !== 'OK') return console.log('geocode status: ', status)
                const locTo = res[0].geometry.location.toJSON()
    
                //update state (see create-trip.js)
                this.props.updateLocation(this.props.segmentId, locTo, 'to')
                console.log('locTo received')

                callback()
            })
        })        
    }

    previewRoutes = (props) => {
        // remove current renderedRoutes
        this.setState({isLoading: true})
        if (this.state.renderedRoutes.length > 0) {
            for (let i = 0; i < this.state.renderedRoutes.length; i++) {
                this.state.renderedRoutes[i].setMap(null)
            }
            this.setState({renderedRoutes: [], Routes: null})
        }
        
        var self = this
        this.codeAddresses(() => {
            let directionsService = new self.props.mapsApi.DirectionsService()
                console.log(directionsService)
                console.log('directionsService received')
                Promise.resolve(directionsService.route({
                    origin: self.props.selectedCityFrom.location,
                    destination: self.props.selectedCityTo.location,
                    provideRouteAlternatives: true,
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    if (status !== 'OK') console.log(status)
                    self.setState({isLoading: false})
                    let routes = [...response.routes]
                    let renderers = []
        
                    // map the routes on the modal map to visualize the options
                    for (let i = 0; i < routes.length; i++) {
                        let directionsRenderer = new self.props.mapsApi.DirectionsRenderer({supressMarkers: true})
                        // console.log(routes[i])
                        directionsRenderer.setDirections(response)
                        directionsRenderer.setRouteIndex(i)
                        directionsRenderer.setOptions({
                            polylineOptions: {
                                strokeColor: '#0088FF',
                                strokeOpacity: 0.6
                            }
                        })
                        directionsRenderer.setMap(self.state.resultsPanelMap)
        
                        renderers.push(directionsRenderer)
                    }
        
                    // create the component that will become the table rows and udpdate state
                    let routeComponents = routes.map((route, i) => (
                        // onClick, pass the chosen renderer back to be rendered on the main map.
                        <tr
                            key={i}
                            //if self matches the clicked row, color it green
                            style={
                                i === self.state.selected ?
                                    {backgroundColor: 'orange'}
                                    : null
                            }                        
                            onMouseOver={() => {
                                // highlight the route on the map when the tabke row is hovered over
                                renderers[i].setOptions({
                                    polylineOptions: {
                                        strokeColor: '#0088FF',
                                        strokeWeight: 8,
                                        strokeOpacity: 0.8
                                    }
                                })
                                renderers[i].setMap(self.state.resultsPanelMap)
                                
                                // set the other routes to the default options
                                for (let j = 0; j < renderers.length; j++) {
                                    if ( j !== i ) {
                                        renderers[j].setOptions({
                                            polylineOptions: {
                                                strokeColor: '#0088FF',
                                                strokeWeight: 6,
                                                strokeOpacity: 0.6
                                            }
                                        })
                                        renderers[j].setMap(self.state.resultsPanelMap)
                                    }
                                }
                            }}
                            onClick={() => {
                                self.props.handleSelectRoute(response, i, self.props.segmentId)
                                self.setState({selected: i})
                            }}
                        >
                            <td>{route.summary}</td>
                            <td>{route.legs[0].distance.text}</td>
                            <td>{route.legs[0].duration.text}</td>
                            <td>{"$" + calculateEstCost(route.legs[0].distance.value, 25)}</td>
                        </tr>
                    // )
                    ))
        
                    // add both to state
                    self.setState({
                        Routes: routeComponents,
                        renderedRoutes: renderers,
                        previewVisible: true
                    })
        
                }))
            
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ from: this.props.selectedCityFrom.name, to: this.props.selectedCityTo.name })

        // if any of the props have changed, remove the rendered routes from the map
        // reset the state for Routes and routeComponents
        if (
            (nextProps.selectedCityFrom.name !== this.state.from) ||
            (nextProps.selectedCityTo.name !== this.state.to) ||
            (nextProps.selectedDate !== this.props.selectedDate) ||
            (nextProps.selectedMode !== this.props.selectedMode)
        ) {
            let renderedRoutes = []

            if(this.state.renderedRoutes) {
                renderedRoutes = [...this.state.renderedRoutes]
                for (let i = 0; i < renderedRoutes.length; i++) {
                    renderedRoutes[i].setMap(null)
                }
                renderedRoutes = []
            }

            this.setState({ previewVisible: false, renderedRoutes: renderedRoutes, Routes: null, selected: null })
        }

    }

    apiIsLoaded = (map, maps) => {
        console.log('api loaded')
    
        // map is the instance on the modal; maps is the GMaps API service
        this.setState({resultsPanelMap: map, maps: maps})
    }

    render = (props) => {
        

        let results = (
            <div className={classes.placeholder}>
                { !(this.state.isLoading) ? 
                    <Button
                        // onClick={this.renderRoutes}
                        onClick={this.previewRoutes}
                        disabled={
                            // make sure all props are filled out before letting the user generate route options
                            (this.props.selectedCityFrom.name.length >  0 &&
                            this.props.selectedCityTo.name.length > 0 &&
                            this.props.selectedDate &&
                            this.props.selectedMode) ?
                                false
                                : true
                        }
                    >Preview Routes</Button>
                :
                    <Loader/>
                }
            </div>
        )
       
        if (this.state.previewVisible) {
            console.log('prevVisible:',this.state.previewVisible)
                results = (
                    <React.Fragment>
                        <p style={{fontWeight: 'bold'}}>Select your preferred route: </p>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <td>Summary</td>
                                    <td>Distance</td>
                                    <td>Duration</td>
                                    <td>Fuel cost</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Routes}
                            </tbody>
                        </Table>
                    </React.Fragment>
                )
            // }
        }
        

        return (
            <div className={classes.resultsPanel}>
                <div className={classes.routeOptions}>
                    {results}
                </div>
                <div className={classes.map}>
                    <Map handleApiLoaded={this.apiIsLoaded}/>
                </div>
            </div>
            
        )
    }
}

export default ResultsPanel