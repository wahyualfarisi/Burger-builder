import React, { Component } from 'react';
import Aux from './../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys(ingredients)
                    .map(igKey => ingredients[igKey])
                    .reduce((a, b) => a + b, 0);
        
        return sum > 0
    }
    

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            })
        }else{
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit()
        
        this.props.history.push('/checkout')
    }

    render(){
        let orderSummary = null;

        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Something went wrong</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        purchasable={ this.updatePurchaseState(this.props.ings) }
                        price={this.props.price}
                        ingredients={this.props.ings}
                        addIngredient={this.props.onIngredientAdd} 
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        removeIngredient={this.props.onIngredientRemove} />
                </Aux>
            );

            orderSummary =  <OrderSummary 
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.props.ings} 
            />
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                
               {burger}
               
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch( actions.addIngredient(ingName) ),
        onIngredientRemove: (ingName) => dispatch( actions.removeIngredient(ingName) ),
        onInitIngredients: () => dispatch( actions.initIngredients()),
        onPurchaseInit: () => dispatch( actions.purchaseInit()  )
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) )  ;