import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = (props) => {
    

    let attachedClass = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClass = [classes.SideDrawer, classes.Open];
    }

    
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                <Logo />
                <nav>
                    <NavigationItems isAuth={props.isAuth} />     
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
