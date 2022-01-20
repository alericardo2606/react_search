export const API_SEARCH_URL = `${process.env.REACT_APP_SEARCH_URL}`
export const API_SEARCH_FILTER = `${process.env.REACT_APP_SEARCH_FILTER}`
export const API_AUTOCOMPLETE = `${process.env.REACT_APP_URL_SOCKET}`


export const REQUEST = actionType => `${actionType}_PENDING`
export const SUCCESS = actionType => `${actionType}_FULFILLED`
export const FAILURE = actionType => `${actionType}_REJECTED`

const ACTION_TYPE = {
    BOOST_SEARCH: 'BOOST_SEARCH',
    SET_BOOST_SEARCH_DATA: 'SET_BOOST_SEARCH_DATA',
    BOOST_SEARCH_FILTER: 'BOOST_SEARCH_FILTER',
    BOOST_AUTOCOMPLETE: 'BOOST_AUTOCOMPLETE',
}

export default ACTION_TYPE
