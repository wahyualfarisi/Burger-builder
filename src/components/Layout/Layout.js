import React from 'react';
import Aux from './../../hoc/Aux';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        isShowSideDraw: false
    }

    sideDrawerCloseHander = () => {
        this.setState({ isShowSideDraw: false })
    }


    sideDrawerToggleHandler = () => {
       this.setState(prevState => {
           return {
               isShowSideDraw: !prevState.isShowSideDraw
           }
       })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.isShowSideDraw} 
                    closed={this.sideDrawerCloseHander} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )    
    }
} 

export default Layout;