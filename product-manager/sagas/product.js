import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import {
    GET_PRODUCTS, ADD_PRODUCT, GET_PRODUCT, DELETE_PRODUCT
} from "../actionTypes/product";

let URI = "http://172.16.99.28:4000/products";

function* getProducts(action) {
    try {
        let products = yield fetch(`${URI}?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* getProduct(action) {
    try {
        let product = yield fetch(`${URI}/${action.id}`).then(r => r.json());
        yield put(actionCreators.getProductSuccess(product))
    } catch (error) {
        yield put(actionCreators.getProductFailure(error))
    }
}

function* addProduct(action) {
    try {
        let product = yield fetch(`${URI}\products`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.addProductSuccess(product))
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
    }
}

function* deleteProduct(action) {
    try {
        let product = yield fetch(`${URI}/${action.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.deleteProductSuccess(action.id))
    } catch (error) {
        yield put(actionCreators.deleteProductFailure(error))
    }
}
export function* productWatchers() {
    yield [takeLatest(GET_PRODUCTS, getProducts),
    takeLatest(DELETE_PRODUCT, deleteProduct),
    takeLatest(ADD_PRODUCT, addProduct),
    takeLatest(GET_PRODUCT, getProduct)]
}