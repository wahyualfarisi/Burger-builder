import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const Modal = (props) => {
    return (
        <Aux>
             <Backdrop show={props.show} />
            <div 
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                {props.children}
            </div>
        </Aux>
    )
}

export default Modal
