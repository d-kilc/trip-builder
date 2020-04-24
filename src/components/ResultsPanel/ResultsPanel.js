import React, { Suspense } from "react"
import { unstable_createResource } from 'react-cache'

import classes from "./ResultsPanel.module.css"

class ResultsPanel extends React.Component {
    state = {
        
    }

    renderRoutes = (cb) => {
        let directionsService = new this.props.mapsApi.DirectionsService()

        try {
            directionsService.route({
                origin: this.props.selectedCityFrom.location,
                destination: this.props.selectedCityTo.location,
                provideRouteAlternatives: true,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') cb && cb(response)
            })

        } catch (err) {
            console.log(err)
        }
    }
    
    componentDidMount = (props) => {
        this.setState({
            map: this.props.mapObj,
            maps: this.props.mapsApi,
            segmentDataComplete: this.props.selectedCityFrom && this.props.selectedCityTo && this.props.selectedDate && this.props.selectedMode
        })
    }

    componentDidUpdate = (props) => {
        if (this.props.selectedCityFrom && this.props.selectedCityTo && this.props.selectedDate && this.props.selectedMode) {
            this.renderRoutes((res) => {

                console.log(res)
                let routes = [...res.routes]
    
                this.setState({
                    Routes: routes.map((route, i) => (
                        // return (
                            <tr key={i}>
                                <td>{route.summary}</td>
                                <td>{route.legs[0].distance.text}</td>
                                <td>{route.legs[0].duration.text}</td>
                            </tr>
                        // )
                    ))
                })
            })
        }
    }

    render = (props) => {

        // if all data has not been entered, don't render the results
        // in this case we will render a placeholder instead
        // let segmentDataComplete = this.props.selectedCityFrom && this.props.selectedCityTo && this.props.selectedDate && this.props.selectedMode
        let results = (
            <div className={classes.resultsPanel}>
                <p>Please fill in the form</p>
            </div>
        )

        if (this.state.segmentDataComplete) {
            // get route options
            results = (
                <div className={classes.resultsPanel}>
                    <p>Loading...</p>
                </div>
            )
        }
        
        if (this.state.Routes) {
            results = (
                <div className={classes.resultsPanel}>
                    
                    <table>
                        <thead>
                            <tr>
                                <td>Summary</td>
                                <td>Distance</td>
                                <td>Duration</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Routes}
                        </tbody>
                    </table>
                </div>
            )
        } 

        return results
    }
}

export default ResultsPanel