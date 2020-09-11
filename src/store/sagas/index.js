import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from './../actions/actionTypes';
import { logoutSaga, checkauthTimeoutSaga, authUser, authCheckStateSaga  } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrderSaga } from './order';

function* whatcAuth() {
    yield takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkauthTimeoutSaga )
    yield takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga );
    yield takeEvery( actionTypes.AUTH_USER, authUser )
    yield takeEvery( actionTypes.AUTH_CHECK_STATE, authCheckStateSaga )
}

function* whatcBurger(){
    yield takeEvery( actionTypes.SET_INIT_INGREDIENTS, initIngredientsSaga );


}

function* whatcOrder(){
    yield takeEvery( actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery( actionTypes.FETCH_ORDER_INITIAL, fetchOrderSaga )
}


export default function* rootSaga(){
    yield all([
        whatcAuth(),
        whatcBurger(),
        whatcOrder()
    ])
}