import React, { Component } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Dropdown, FormControl} from 'react-bootstrap'

import classes from './Stop.module.css'

class Stop extends React.Component {
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
                    <div className={classes.Col}>    
                        <Dropdown
                            className={classes.Dropdown}
                            size='sm'
                            onSelect={(e) => this.props.modeChanged(e, this.props.id)}
                        >
                            <Dropdown.Toggle id="dropdown-basic">
                                {this.props.selectedMode ? this.props.selectedMode : "Mode"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.props.modes.map((obj, idx) => {
                                    return (
                                        <Dropdown.Item eventKey={obj}>
                                            {obj}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className={classes.Col}>
                        <DatePicker
                            placeholderText="Travel date"
                            className={classes.DatePicker}
                            selected={this.props.selectedDate === "" ? null : this.props.selectedDate}
                            onChange={date => this.props.dateChanged(date, this.props.id)}
                        />
                    </div>
                </div>
                {this.props.id === 'end' ?
                    null
                    : <div className={classes.Btn}><Button size="sm" variant="danger" onClick={() => this.props.stopRemoved(this.props.id)}>-</Button></div>
                    // : <button className={classes.Btn} variant="danger" onClick={() => this.props.stopRemoved(this.props.id)}>-</button>
                }
            </div>
        )
    }

}
  

export default Stop