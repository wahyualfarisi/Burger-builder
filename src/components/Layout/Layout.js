import React from 'react';
import Aux from './../../hoc/Aux';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        isShowSideDraw: true
    }

    sideDrawerCloseHander = () => {
        this.setState({ isShowSideDraw: false })
    }


    render() {
        return (
            <Aux>
                <Toolbar />
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