import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import filterReducer from "./app/filter.reducers";
import searchReducer from "./app/search.reducers";

const initStore = () => {
    const rootReducer = combineReducers({
        filters: filterReducer,
        data: searchReducer
    })

    const store = createStore(
        rootReducer,
        // persistedState,
        applyMiddleware(thunk, promise)
    );

    // store.subscribe(() => {saveStateToLocalStorage(store.getState())})
    return store;
}

export default initStore;
