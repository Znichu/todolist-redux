import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import AppReducer from "./todo-reducer";
import { save, load } from "redux-localstorage-simple"

const rootReducer = combineReducers({
    app: AppReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(save()))(createStore);
const store = createStoreWithMiddleware(rootReducer, load());

export default store;
