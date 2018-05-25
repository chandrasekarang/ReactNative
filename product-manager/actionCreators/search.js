import {GET_SEARCH, GET_SEARCH_SUCCESS, GET_SEARCH_FAILURE} from '../actionTypes/search';

export function getSearch(txt, page, limit) {
    return {
        type: GET_SEARCH,
        txt,
        page,
        limit
    }
}

export function getSearchSuccess(products) {
    return {
        type: GET_SEARCH_SUCCESS,
        products
    }
}

export function getSearchFailure(error) {
    return {
        type: GET_SEARCH_FAILURE,
        error
    }
}