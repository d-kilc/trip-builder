import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = (props) => (
  props.visible ? <div onClick={props.clicked} className={classes.Backdrop}></div> : null
)

export default backdrop