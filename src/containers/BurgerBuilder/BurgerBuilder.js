import React, { Component } from 'react';
import Aux from './../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
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

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIngredientsHandler} 
                    removeIngredient={this.removeIngredientsHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;