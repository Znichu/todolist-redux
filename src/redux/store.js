import {applyMiddleware, combineReducers, createStore} from "redux";
import AppReducer from "./todo-reducer";
import thunk from "redux-thunk";
import AuthReducer from "./app-reducer";


const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
