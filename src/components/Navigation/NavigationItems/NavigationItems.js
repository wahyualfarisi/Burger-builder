import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css';
import { withRouter  } from 'react-router-dom';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact> Burder Builder </NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders"> Orders </NavigationItem> : null } 
            {!props.isAuth 
                ? <NavigationItem link="/auth"> Authenticated </NavigationItem>
                : <NavigationItem link="/logout"> Logout </NavigationItem>  }  
        </ul>
    );
}

export default withRouter(NavigationItems) 
