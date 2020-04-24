import React, { Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = props => {

  return (
    <React.Fragment>
      <Backdrop
        visible={props.visible}
        clicked={props.hide}
        id={props.id}/>
      <div
        className={classes.Modal}
        style={{
          transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.visible ? '1' : '0',
        }}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default modal