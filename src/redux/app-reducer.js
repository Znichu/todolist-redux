import {todoListAPI} from "../api/api";
import {getTodoLists} from "./todo-reducer";

const SET_AUTH_DATA = "App/TodoList/SET_AUTH_DATA";
const INITIALIZED_SUCCESSES = "App/TodoList/INITIALIZED_SUCCESSES";


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    initialized: false
};



const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case INITIALIZED_SUCCESSES:
            return {
                ...state,
                initialized: true

            };
            default:
                return state
    }
};

const setAuthData = (id, login, email, isAuth) => ({ type: SET_AUTH_DATA, payload: { id, login, email, isAuth } });
const initializedSuccesses = () => ({ type: INITIALIZED_SUCCESSES });

export const login = (email, password, rememberMe) => (dispatch) => {
    todoListAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuth());
                dispatch(getTodoLists());
            }
        })
};
export const logout = () => (dispatch) => {
    todoListAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthData(null, null, null, false))
            }
        })
};

export const setAuth = () => (dispatch) => {
    return todoListAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthData(id, login, email, true))
            }
        })
};

export const initialized = () => (dispatch) => {
    let promise = dispatch(setAuth());
    promise.then( () => {
        dispatch(initializedSuccesses());
    })

};

export default AuthReducer;