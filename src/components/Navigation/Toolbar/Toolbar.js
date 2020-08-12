import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    console.log('[Toolbar.js]', props)
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggleHandler} />
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
