import React, { Component } from 'react';
import Aux from './../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICE = {
    salad: 2000,
    bacon: 3000,
    cheese: 4000,
    meat: 10000
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 1000,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get(`/ingredients.json`)
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            })
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys(ingredients)
                    .map(igKey => ingredients[igKey])
                    .reduce((a, b) => a + b, 0);
        
        this.setState({
            purchasable: sum > 0
        });

    }

    addIngredientsHandler = type => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount  + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState( updatedIngredients )
    }

    removeIngredientsHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) return false;

        const removeCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = removeCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState( updatedIngredients )
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
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Wahyu Alfarisi',
                address: {
                    street: 'Jakarta',
                    zipCode: 14450
                },
                email: 'wahyualfarisi30@gmail.com'
            }
        }
         axios.post('/order.json', order)
              .then(res => {
                  this.setState({
                      loading: false,
                      purchasing: false
                  })
              })
              .catch(res => {
                    this.setState({
                        loading: false,
                        purchasing: false
                    })
              } )

    }

    render(){
        let orderSummary = null;


        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Something went wrong</p> : <Spinner />;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        addIngredient={this.addIngredientsHandler} 
                        ordered={this.purchaseHandler}
                        removeIngredient={this.removeIngredientsHandler} />
                </Aux>
            );

            orderSummary =  <OrderSummary 
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} 
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

export default withErrorHandler(BurgerBuilder, axios) ;