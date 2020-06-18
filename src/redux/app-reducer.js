import {todoListAPI} from "../api/api";
import {getTodoLists} from "./todo-reducer";

const SET_AUTH_DATA = "App/TodoList/SET_AUTH_DATA";


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};



const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
            default:
                return state
    }
};

const setAuthData = (id, login, email, isAuth) => ({ type: SET_AUTH_DATA, data: { id, login, email, isAuth } });

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
    todoListAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthData(id, login, email, true))
            }
        })
};

export default AuthReducer;