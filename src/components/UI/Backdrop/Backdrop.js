import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = (props) => {
    
    return (
        <div>
            {props.show && <div className={classes.Backdrop} onClick={props.clicked}></div>  }
        </div>
    )
}

export default Backdrop
