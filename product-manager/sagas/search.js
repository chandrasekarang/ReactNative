import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/search"
import {
    GET_SEARCH
} from "../actionTypes/search";

let URI = "http://172.16.99.28:4000/products";

function* getSearch(action) {
    try {
        let search = yield fetch(`${URI}?q=${action.txt}&_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getSearchSuccess(search))
    } catch (error) {
        yield put(actionCreators.getSearchFailure(error))
    }
}


export function* searchWatchers() {
    yield takeLatest(GET_SEARCH, getSearch)
}