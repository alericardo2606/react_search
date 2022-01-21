import filterReducer from "./filter.reducers";
import {createUrlParams} from "../../utils/util";
import ACTION_TYPE, {API_SEARCH_URL, REQUEST, SUCCESS} from "./app.actions";
import axios from "axios";

const initialState = {
    board_info: null,
    condition: null,
    items: [],
    map_items: [],
    pagination: {
        next: false,
        prev: false,
        start: null,
        end: null,
        range: [],
        count: null,
        pages: null
    },
    params: null,
    slug: '',
    waiting: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPE.SET_BOOST_SEARCH_DATA: {
            return action.payload
        }

        default:
            return state
    }
}

export const getSearchData = () => async (dispatch, getState) => {
    const currentState = getState().filters;

    const params = createUrlParams(currentState);

    const body = `access_token=NjVmNWJjYmY2YjgxMjA0MjU0Njg4ODY1NjFjMDJjYzFmMTA2YTViMTMzMjhmMWY1ZGFjZDZmOTE5NWE3ZjZkMg&search_filter_id=${currentState.token_id}&get_off_market_position=0&post_params=${params}%26polygon_search%3D${currentState.shape}&event_triggered=yes&device_width=${window.innerWidth}`;

    const resSearchUrl = await axios.post(API_SEARCH_URL, body);

    dispatch({
        type: ACTION_TYPE.BOOST_SEARCH_FILTER,
        payload: resSearchUrl.data,
    })
}

export const setData = (value) => async (dispatch, getState) => {
    dispatch({
        type: ACTION_TYPE.SET_BOOST_SEARCH_DATA,
        payload: value,
    })
}


export default searchReducer
