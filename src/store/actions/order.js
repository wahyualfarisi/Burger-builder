import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() )
        axios.post('/order.json', orderData)
              .then(res => {
                    console.log(res)
                    dispatch(purchaseBurgerSuccess(res.data.name, orderData))
              })
              .catch(err => {
                    dispatch(purchaseBurgerFail(err))
              });
    };
};


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch( fetchOrderStart() )
        axios.get('/order.json')
        .then(res => {
            console.log(res)
           dispatch( fetchOrderSuccess(res.data) )
        })
        .catch(err => {
           dispatch( fetchOrderFail(err) )
        })
    }
}


