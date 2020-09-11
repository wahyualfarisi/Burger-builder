import { put } from 'redux-saga/effects';
import Axios from './../../axios-orders';
import * as actions from './../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put( actions.purchaseBurgerStart())
    try{
        const res = yield Axios.post(`/order.json?auth=${action.token}`, action.orderData)
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData))
    }catch(error){
        yield put(actions.purchaseBurgerFail(error))
    }

}

export function* fetchOrderSaga(action){
    yield put( actions.fetchOrderStart())
    try{
        const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
        const res = yield Axios.get(`/order.json${queryParams}`)
        yield put( actions.fetchOrderSuccess(res.data) )
    }catch(error){
        yield put(actions.fetchOrderFail(error) )
    }
}