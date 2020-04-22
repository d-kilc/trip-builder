import React from "react"
import { Container, Row, Col, Button, ButtonGroup, Dropdown} from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-date-picker'
// import { DatePicker } from "react-bootstrap-date-picker";

import Modal from "../UI/Modal/Modal"

import classes from "./Segment.module.css"
// import "react-datepicker/dist/react-datepicker.css"

class Segment extends React.Component {

    componentDidMount = () => {

    }

    render = (props) => {
        let hideSaveButton = true

        if (this.props.selectedCityFrom && this.props.selectedCityTo && this.props.selectedDate && this.props.selectedMode) {
            hideSaveButton = false
        }

        return(
            <Container>
                <Modal visible={this.props.modalVisible} hide={this.props.handleCancelEdit}>
                    <div className={classes.controlPanel}>
                        <Row className={classes.Row}>
                            <Col xs={{span: 12}} sm={{span:6}} className={classes.Col}>
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    className={classes.FormControl}
                                    size='sm'
                                    placeholder="City from"
                                    value={this.props.selectedCityFrom}
                                    onChange={(e) => this.props.handleCityFromChange(e, this.props.id)} type="text"
                                />
                            </Col>
                            <Col xs={{span: 12}} sm={{span: 6}} className={classes.Col}>
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                    className={classes.FormControl}
                                    size='sm'
                                    placeholder="City to"
                                    value={this.props.selectedCityTo}
                                    onChange={(e) => this.props.handleCityToChange(e, this.props.id)} type="text"
                                />
                            </Col>
                        </Row>
                        <Row className={classes.Row}>
                            <Col xs={{span: 12}} sm={{span: 6}} className={classes.datePickerContainer}>
                                <Form.Label>Travel date</Form.Label>
                                <DatePicker
                                    className={classes.DatePicker}
                                    onChange={(e) => this.props.handleDateChange(e, this.props.id)}
                                    value={this.props.selectedDate}    
                                />
                            </Col>
                            <Col xs={{span: 12}} sm={{span: 6}} className={classes.Col}>
                                <Form.Label>Travel method</Form.Label>
                                <Form.Control
                                    as="select"
                                    size='sm'
                                    onChange={(e) => this.props.handleMethodChange(e, this.props.id)}
                                    // className={classes.DatePicker}
                                    // value={this.props.selectedDate}
                                    // onChange={(e) => this.props.handleDateChange(e, this.props.id)}
                                >
                                    <option value="" disabled selected> </option>
                                    {this.props.methods.map((method) => {
                                        return (
                                            <option eventKey={method}>
                                                {method}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{display: 'flex', justifyContent: 'center'}} sm={{span: 12}}>
                                <Button
                                    variant='success'
                                    disabled={hideSaveButton}
                                    size='sm'
                                    onClick={() => this.props.handleSaveSegment(this.props.id)}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>

    {/* --------------------------------------------------------------------------------------------------- */}

                <Row className={classes.Row}>
                    <Col xs={{span:3, offset: 1}} className={classes.Col}>
                        <Form.Control
                            disabled
                            className={classes.FormControl}
                            size='sm'
                            placeholder="City from"
                            value={this.props.selectedCityFrom}
                            onChange={(e) => this.props.handleCityFromChange(e, this.props.id)} type="text"
                        />
                    </Col>
                    <Col xs={{span: 3}} className={classes.Col}>
                        <Form.Control
                            disabled
                            className={classes.FormControl}
                            size='sm'
                            placeholder="City to"
                            value={this.props.selectedCityTo}
                            onChange={(e) => this.props.handleCityToChange(e, this.props.id)} type="text"
                        />
                    </Col>
                    <Col xs={{span: 3}} className={classes.Col}>
                        {/* change to datepicker */}
                        {/* <Form.Control
                            disabled
                            className={classes.DatePicker}
                            size='sm'
                            value={this.props.selectedDate}
                            onChange={(e) => this.props.handleDateChange(e, this.props.id)}
                        /> */}
                        <DatePicker 
                            className={classes.DatePicker}
                            disabled='true'
                            value={this.props.selectedDate}    
                        />
                    </Col>
                    <Col xs={1} className={classes.BtnCol}>
                        <ButtonGroup
                            // className={classes.Button}
                        >
                            <Button onClick={this.props.handleEdit}>Edit</Button>
                            { 
                                this.props.id > 0 ?
                                    <Button variant='danger' onClick={() => this.props.handleRemoveSegment(this.props.id)}>Delete</Button>
                                    : null
                            }
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Segment