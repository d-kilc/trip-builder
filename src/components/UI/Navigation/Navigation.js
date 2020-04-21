import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useStaticQuery, graphql } from "gatsby"
import { Link } from 'gatsby'


import classes from './Navigation.module.css'

export default (props) => {
    const data = useStaticQuery(
        graphql`query { site {  siteMetadata { title }}}`
    )
    
    return (
        <div className={classes.container}>
            <Navbar className={classes.Navbar} bg="dark" variant="dark">

                <div className={classes.MobileOnly}>
                    {/* <SideDrawer sideDrawerOpen={this.props.sideDrawerOpen}/> */}
                    <button
                        className={classes.button}
                        onClick={props.toggleSideDrawer}
                    >
                        Menu
                    </button>
                </div>

                <div className={classes.DesktopOnly}>
                    <Navbar.Brand href="/">
                        {data.site.siteMetadata.title}
                    </Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav.Link>About</Nav.Link>
                        <Nav.Link>Something</Nav.Link>
                        <Nav.Link>Something else</Nav.Link>
                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}

// export default navigation