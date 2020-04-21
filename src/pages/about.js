import React from "react"
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { graphql } from "gatsby"

import Layout from '../containers/Layout/Layout'

import classes from '../page-level-css/index.module.css'


export default ({data}) => {
    return(
        <Layout>
            <h1>About {data.site.siteMetadata.title}</h1>
        </Layout>
    )
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
