import React from "react"

import Navigation from '../../components/UI/Navigation/Navigation'
import SideDrawer from '../../components/UI/SideDrawer/SideDrawer'

class Layout extends React.Component {
    
    state = {
        showSideDrawer: false
    }
         
    sideDrawerClosedHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}})
    }

    render = (props) => {
        return(
            <div>
                <Navigation
                    toggleSideDrawer={this.sideDrawerClosedHandler}
                />
                <SideDrawer
                    sideDrawerOpen={this.state.showSideDrawer}
                    toggleSideDrawer={this.sideDrawerClosedHandler}
                />
                {this.props.children}
            </div>
        )
    }
}

export default Layout