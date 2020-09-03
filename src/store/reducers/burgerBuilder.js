import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
    salad: 2000,
    bacon: 3000,
    cheese: 4000,
    meat: 10000
}


const initialState = {
    ingredients: null,
    totalPrice: 1000,
    error: false
}

const reducer = (state = initialState, action) => {

    const priceAddition = INGREDIENT_PRICE[action.ingredientName];
    const oldPrice      = state.totalPrice;

    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: oldPrice + priceAddition
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: oldPrice - priceAddition
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default reducer;