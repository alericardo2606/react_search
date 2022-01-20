import ACTION_TYPE, {API_SEARCH_FILTER, API_SEARCH_URL, REQUEST, SUCCESS} from "./app.actions";
import axios from 'axios';

const initialState = {
    waiting: false,
    searching: '',
    search_data: [],
    amenities: [],
    count: '',
    created_at: '',
    default_view: '',
    gmap_coords_zoom: null,
    id_hackbox: '',
    is_force_registration: false,
    map_overlay_hidden: null,
    max_baths: null,
    max_beds: null,
    max_living_size: null,
    max_lot_size: null,
    max_rent_price: null,
    max_sale_price: null,
    max_year: null,
    min_baths: null,
    min_beds: null,
    min_living_size: null,
    min_lot_size: null,
    min_rent_price: null,
    min_sale_price: null,
    min_year: null,
    modified_in: '',
    name: '',
    parking_options: null,
    polygon_search: '',
    property_type: '',
    sale_type: '',
    sort_type: '',
    token_id: '',
    tripwire_id: null,
    waterfront_options: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ACTION_TYPE.BOOST_SEARCH):
            return {...state, waiting: true, searching: 'Searching...'}
        case SUCCESS(ACTION_TYPE.BOOST_SEARCH):
            return action.payload

        case REQUEST(ACTION_TYPE.BOOST_SEARCH_FILTER):
            return {...state, waiting: true}
        case SUCCESS(ACTION_TYPE.BOOST_SEARCH_FILTER):
            return action.payload

        case ACTION_TYPE.SET_BOOST_SEARCH_DATA:
            return action.payload

        default:
            return state
    }
}


export const getFilterParams = (filter_id) => async (dispatch, getState) => {
    let currentState = getState();
    let search_data = [];
    let params = '';
    await dispatch({
        type: ACTION_TYPE.BOOST_SEARCH_FILTER,
        payload: axios
            .get(API_SEARCH_FILTER + '/' + filter_id)
            .then((response) => {
                currentState = {...response.data, search_data: []};
                Object.keys(currentState)
                    .forEach((item) => {
                        if (item !== 'search_data' && item !== 'gmap_coords_zoom' && item !== 'created_at' && item !== 'modified_in' && item !== 'polygon_search' && item !== 'name' && item !== 'token_id' && item !== 'default_view' && item !== 'count' && item !== 'sort_type' && item !== 'page' && item !== 'id_hackbox' && item !== 'amenities') {
                            if (currentState[item] !== null) {
                                params += `%26${item}%3D${currentState[item]}`;
                            } else {
                                params += `%26${item}%3D${currentState[item] !== null ? currentState[item] : ''}`;
                            }
                        }
                    });
                const body = `access_token=NjVmNWJjYmY2YjgxMjA0MjU0Njg4ODY1NjFjMDJjYzFmMTA2YTViMTMzMjhmMWY1ZGFjZDZmOTE5NWE3ZjZkMg&search_filter_id=${currentState.token_id}&get_off_market_position=0&post_params=${params}%26polygon_search%3D${currentState.polygon_search}&event_triggered=yes&device_width=${window.innerWidth}`;
                axios
                    .post(API_SEARCH_URL, body)
                    .then((response) => {
                        currentState.search_data = response.data
                    })
                return currentState;
            })
    })
    // await dispatch(setData(search_data))
}


export const getSearchData = () => async (dispatch, getState) => {
    const currentState = getState().appReducer;
    let params = '';
    Object.keys(currentState)
        .forEach((item) => {
            if (item !== 'search_data' && item !== 'gmap_coords_zoom' && item !== 'created_at' && item !== 'modified_in' && item !== 'polygon_search' && item !== 'name' && item !== 'token_id' && item !== 'default_view' && item !== 'count' && item !== 'sort_type' && item !== 'page' && item !== 'id_hackbox' && item !== 'amenities') {
                if (currentState[item] !== null) {
                    params += `%26${item}%3D${currentState[item]}`;
                } else {
                    params += `%26${item}%3D${currentState[item] !== null ? currentState[item] : ''}`;
                }
            }
        });
    const body = `access_token=NjVmNWJjYmY2YjgxMjA0MjU0Njg4ODY1NjFjMDJjYzFmMTA2YTViMTMzMjhmMWY1ZGFjZDZmOTE5NWE3ZjZkMg&search_filter_id=${currentState.token_id}&get_off_market_position=0&post_params=${params}%26polygon_search%3D${currentState.shape}&event_triggered=yes&device_width=${window.innerWidth}`;
    debugger
    await dispatch({
        type: ACTION_TYPE.BOOST_SEARCH,
        payload: axios
            .post(API_SEARCH_URL, body)
            .then((response) => {
                console.log(response)
            })
    })
}

export const setData = (value) => async (dispatch, getState) => {
    await dispatch({
        type: ACTION_TYPE.SET_BOOST_SEARCH_DATA,
        payload: {
            ...getState(),
            search_data: value
        },
    })
}

export default appReducer
