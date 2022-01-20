import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import appReducer from "./app/app.reducers";

const initStore = () => {
    const rootReducer = combineReducers({
        boostData: appReducer
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
