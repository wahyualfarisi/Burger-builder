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
import * as actionTypes from './../../store/actions';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get(`/ingredients.json`)
        //     .then(res => {
        //         this.setState({
        //             ingredients: res.data
        //         })
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error: true
        //         })
        // })
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys(ingredients)
                    .map(igKey => ingredients[igKey])
                    .reduce((a, b) => a + b, 0);
        
        return sum > 0
    }
    

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render(){
        let orderSummary = null;

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Something went wrong</p> : <Spinner />;

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


        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                
               {burger}
               
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientsName: ingName }),
        onIngredientRemove: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientsName: ingName })
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) )  ;