import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {
    
    checkoutCanceledHander = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render(){
        return (
            <div>
                <CheckoutSummary 
                    checkoutCanceled={this.checkoutCanceledHander}
                    checkoutContinue={this.checkoutContinueHandler}
                    ingredients={this.props.ings} 
                />
                
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout) ;