import {applyMiddleware, combineReducers, createStore} from "redux";
import AppReducer from "./todo-reducer";
import thunk from "redux-thunk";
import AuthReducer from "./app-reducer";


const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
});

type RootReducer = typeof rootReducer
export type RootAppState = ReturnType<RootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

