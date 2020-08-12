import React from 'react';
import classes from './Button.module.css'


const Button = (props) => {
    console.log('[Button.js] ', props, classes)
    return (
        <button 
            onClick={props.clicked}
            className={[classes.Button, classes[props.btnType]].join(' ')} >
            {props.children}
        </button>
    )
}
export default Button