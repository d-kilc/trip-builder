import React, { Component } from 'react'

import Layout from '../containers/Layout/Layout'
// import Modal from '../components/UI/Modal/Modal'
import Map from '../components/Map/Map'
import TripBuilder from '../components/TripBuilder/TripBuilder'

import classes from '../page-level-css/create-trip.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class ManageLodgings extends Component {
    constructor(props) {
        super(props);
 
        // Geocode.setApiKey("AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac")
        // Geocode.setLanguage("en")
    
        this.state = { 
           
        }
    } 


    render(props) {
        return (
            <Layout>

               
            </Layout>
        )
    }
}

export default ManageLodgings