import React from "react"
import Navbar from 'react-bootstrap/Navbar'

import classes from './Navigation.module.css'

const navigation = (props) => {
    return (
        <div className={classes.container}>
            <Navbar className={classes.Navbar} bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    Trip Builder
                </Navbar.Brand>
            </Navbar>
        </div>
    )
}

export default navigation