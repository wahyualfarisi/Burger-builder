import React from 'react';
import Aux from '../Aux/Aux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null 
    }
}

export default connect(mapStateToProps, null)(Layout) ;