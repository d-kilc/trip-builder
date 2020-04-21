import React from 'react'
import { Link } from 'gatsby'

// import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../Backdrop/Backdrop'

import classes from './SideDrawer.module.css'


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.sideDrawerOpen) {
      attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return(
      <React.Fragment>
        <Backdrop visible={props.sideDrawerOpen} clicked={props.toggleSideDrawer}/>
        <div className={attachedClasses.join(' ')}>
        {/* <Logo style={{margin: "32px"}} height="11%"/> */}
          <nav>
            <ul>
              <li>
                <Link to="/create-trip" className={classes.Link}>Trip Builder</Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>Something</Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>Something else</Link>
              </li>
              <li>
                <Link to="/about" className={classes.Link}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
      
    )
}
  
  export default sideDrawer