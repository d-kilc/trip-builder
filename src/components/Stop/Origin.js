import React, { Component } from 'react'
// import Select from 'react-select'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import classes from './Stop.module.css'

class Origin extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render(props) {     
        return (
            <div className={classes.container}>
                <div className={classes.inputFrame}>
                    <div className={classes.Col}>
                        <FormControl
                            placeholder="City"
                            value={this.props.selectedCity}
                            onChange={(e) => this.props.cityChanged(e, this.props.id)} type="text"
                        />
                    </div>
                    <div className={classes.Col}></div>
                    <div className={classes.Col}></div>
                    {/* <div className={classes.Col}></div> */}
                </div>
            </div>
        )
    }

}
  
export default Origin