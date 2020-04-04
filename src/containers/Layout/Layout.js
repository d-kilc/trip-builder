import React from "react"
import Navigation from '../../components/Navigation/Navigation'

const layout = props => {
    return(
        <div>
            <Navigation/>
            {props.children}
        </div>
    )
}

export default layout