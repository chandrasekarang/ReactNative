import {
    GET_SEARCH,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCESS,
} from "../actionTypes/search";


export default (prevState = {
    products: [],
    isLoading: false,
    page: 1,
    limit: 8
}, action) => {
    switch (action.type) {
        case GET_SEARCH:
            return {
                ...prevState,
                isLoading: prevState.products.length > 0 ? false : true,
                page: action.page
            }
        case GET_SEARCH_SUCCESS:
            return {
                ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
        case GET_SEARCH_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;

    }
}