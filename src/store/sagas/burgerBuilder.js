import { put } from 'redux-saga/effects';
import Axios from './../../axios-orders';
import * as actions from './../actions/index'

export function* initIngredientsSaga(action){
    try{
        const res = yield Axios.get('/ingredients.json');
        yield put( actions.setIngredients(res.data) )
    }catch(error){
        yield put( actions.fetchIngredientsFailed())   
    }
}