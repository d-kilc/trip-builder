import React, { Component } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Dropdown, InputGroup, FormControl} from 'react-bootstrap'

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
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">City</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={this.props.selectedCity}
                                onChange={(e) => this.props.cityChanged(e, this.props.id)} type="text"
                            />
                        </InputGroup>
                    </div>
                    <div className={classes.Col}>    
                        <Dropdown
                            onSelect={(e) => this.props.modeChanged(e, this.props.id)}
                        >
                            <Dropdown.Toggle id="dropdown-basic">
                                {this.props.selectedMode}
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
                            selected={this.props.selectedDate}
                            onChange={date => this.props.dateChanged(date, this.props.id)}
                        />
                    </div>
                </div>
                {this.props.id === 'end' ?
                    null
                    : <div className={classes.Btn}><Button variant="danger" onClick={() => this.props.stopRemoved(this.props.id)}>-</Button></div>
                }
            </div>
        )
    }

}
  

export default Stop