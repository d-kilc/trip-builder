import React from "react"
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { Link } from "gatsby"

import Layout from '../containers/Layout/Layout'

import classes from '../page-level-css/index.module.css'


const index = props => {
    return(
        <Layout>
            {/* <Carousel activeIndex={index} onSelect={handleSelect}> */}
            {/* <div className={classes.Caption}> */}
                <Carousel.Caption className={classes.Caption}>
                    <h1>Trip Builder</h1>
                    <p>Plan and budget your vacation from start to finish.</p>
                    <Button href='/create-trip' variant="secondary">Plan your trip</Button>{' '}
                </Carousel.Caption>
            {/* </div> */}
            <Carousel className={classes.Carousel} controls={false} indicators={false} pause={false}>
                <Carousel.Item>
                    <Image
                        className={classes.Image}
                        fluid
                        src="https://s7d2.scene7.com/is/image/TWCNews/ap_19115548990694editedjpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className={classes.Image}
                        fluid
                        src="https://m.media-amazon.com/images/S/aplus-seller-content-images-us-east-1/ATVPDKIKX0DER/A14O613A5OP4S1/ecf4976e-6e9d-4433-9dfb-58fb6ea5f3eb._CR0,29,1280,792_PT0_SX970__.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className={classes.Image}
                        fluid
                        src="https://cdn.cnn.com/cnnnext/dam/assets/180727095635-capetown-pixabay1-super-tease.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </Layout>
    )
}

export default index
