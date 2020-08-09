import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active> Burder Builder </NavigationItem>
            <NavigationItem link="/checkout"> Checkout </NavigationItem>
        </ul>
    )
}

export default NavigationItems
