import React from "react"
import { Container, Row, Col, Button, ButtonGroup, Dropdown} from "react-bootstrap"
import Form from 'react-bootstrap/Form'
// import { DatePicker } from "react-bootstrap-date-picker";

import Modal from "../UI/Modal/Modal"

import classes from "./Segment.module.css"
// import "react-datepicker/dist/react-datepicker.css"

const segment = props => {
    return(
        <Container>
            <Modal visible={props.modalVisible} hide={props.handleCancelEdit}>
                <div className={classes.controlPanel}>
                    <Row>
                        <Col sm={{span:6}} className={classes.Col}>
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                className={classes.FormControl}
                                size='sm'
                                placeholder="City from"
                                value={props.selectedCityFrom}
                                onChange={(e) => props.handleCityFromChange(e, props.id)} type="text"
                            />
                        </Col>
                        <Col sm={{span: 6}} className={classes.Col}>
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                className={classes.FormControl}
                                size='sm'
                                placeholder="City to"
                                value={props.selectedCityTo}
                                onChange={(e) => props.handleCityToChange(e, props.id)} type="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{span: 6}} className={classes.Col}>
                            <Form.Label>Travel date</Form.Label>
                            {/* change to date picker */}
                            <Form.Control
                                className={classes.DatePicker}
                                size='sm'
                                value={props.selectedDate}
                                onChange={(e) => props.handleDateChange(e, props.id)}
                            />
                        </Col>
                        <Col sm={{span: 6}} className={classes.Col}>
                            <Form.Label>Travel method</Form.Label>
                            <Form.Control
                                as="select"
                                size='sm'
                                onChange={(e) => props.handleMethodChange(e, props.id)}
                                // className={classes.DatePicker}
                                // value={props.selectedDate}
                                // onChange={(e) => props.handleDateChange(e, props.id)}
                            >
                                {props.methods.map((method) => {
                                    return (
                                        <option eventKey={method}>
                                            {method}
                                        </option>
                                    )
                                })}
                                {/* <option>Drive</option>
                                <option>Fly</option>
                                <option>Train</option>
                                <option>Bus</option> */}
                            </Form.Control>
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
                        value={props.selectedCityFrom}
                        onChange={(e) => props.handleCityFromChange(e, props.id)} type="text"
                    />
                </Col>
                <Col xs={{span: 3}} className={classes.Col}>
                    <Form.Control
                        disabled
                        className={classes.FormControl}
                        size='sm'
                        placeholder="City to"
                        value={props.selectedCityTo}
                        onChange={(e) => props.handleCityToChange(e, props.id)} type="text"
                    />
                </Col>
                <Col xs={{span: 3}} className={classes.Col}>
                    {/* change to datepicker */}
                    <Form.Control
                        disabled
                        className={classes.DatePicker}
                        size='sm'
                        value={props.selectedDate}
                        onChange={(e) => props.handleDateChange(e, props.id)}
                    />
                </Col>
                <Col xs={1} className={classes.BtnCol}>
                    <ButtonGroup
                        // className={classes.Button}
                    >
                        <Button onClick={props.handleEdit}>Edit</Button>
                        { 
                            props.id > 0 ?
                                <Button variant='danger' onClick={() => props.handleRemoveSegment(props.id)}>Delete</Button>
                                : null
                        }
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default segment