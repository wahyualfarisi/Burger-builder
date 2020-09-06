import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css';
import { withRouter  } from 'react-router-dom';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact> Burder Builder </NavigationItem>
            <NavigationItem link="/orders"> Orders </NavigationItem>
            <NavigationItem link="/auth"> Authenticated </NavigationItem>
        </ul>
    )
}

export default withRouter(NavigationItems) 
