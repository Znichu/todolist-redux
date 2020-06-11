import {applyMiddleware, combineReducers, createStore} from "redux";
import AppReducer from "./todo-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    app: AppReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
