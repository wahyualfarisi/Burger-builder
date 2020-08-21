import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount(){
        
        const queryParams = new URLSearchParams(this.props.location.search);
        
        const ingredients = {};
        let price = 0;

        for(let param of queryParams.entries() ){
            //['salad', '1'] for example
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1]
            }
        }
        
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

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
                    ingredients={this.state.ingredients} />
                
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => (
                        <ContactData 
                            {...this.props}
                            totalPrice={this.state.totalPrice}
                            ingredients={this.state.ingredients} />
                    )}
                />

            </div>
        )
    }

}

export default Checkout;