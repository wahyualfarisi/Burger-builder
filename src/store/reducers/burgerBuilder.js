import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
    salad: 2000,
    bacon: 3000,
    cheese: 4000,
    meat: 10000
}


const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 1000,
}

const reducer = (state = initialState, action) => {

    const priceAddition = INGREDIENT_PRICE[action.ingredientsName];
    const oldPrice      = state.totalPrice;

    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1,
                },
                totalPrice: oldPrice + priceAddition
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
                },
                totalPrice: oldPrice - priceAddition
            }


        default:
            return state;
    }
}

export default reducer;