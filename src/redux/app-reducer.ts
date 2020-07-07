import {todoListAPI} from "../api/api";
import {getTodoLists} from "./todo-reducer";
import {ThunkAction} from "redux-thunk";
import {RootAppState} from "./store";

const SET_AUTH_DATA = "App/SET_AUTH_DATA";
const INITIALIZED_SUCCESSES = "App/INITIALIZED_SUCCESSES";

type InitialStateType = {
    id: null | string
    email: null | string
    login: null | string
    isAuth: boolean
    initialized: boolean
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    initialized: false
};

type ActionsType = SetAuthData | InitializedSuccesses

const AuthReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

type SetAuthData = {
    type: typeof SET_AUTH_DATA
    payload: {
        id: string | null
        login: string | null
        email: string | null
        isAuth: boolean
    }
}
const setAuthData = (id: string | null, login: string | null, email: string | null, isAuth: boolean): SetAuthData => ({ type: SET_AUTH_DATA, payload: { id, login, email, isAuth } });

type InitializedSuccesses = {
    type: typeof INITIALIZED_SUCCESSES
}
const initializedSuccesses = (): InitializedSuccesses => ({ type: INITIALIZED_SUCCESSES });


type ThunkType = ThunkAction<void, RootAppState, unknown, ActionsType>
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) => {
    todoListAPI.login(email, password, rememberMe)
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuth());
                dispatch(getTodoLists());
            }
        })
};
export const logout = (): ThunkType => (dispatch) => {
    todoListAPI.logout()
        .then((data: { resultCode: number; }) => {
            if (data.resultCode === 0) {
                dispatch(setAuthData(null, null, null, false))
            }
        })
};

export const setAuth = (): ThunkType => (dispatch) => {
    return todoListAPI.getAuth()
        .then((data)  => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthData(id, login, email, true))
            }
        })
};

export const initialized = (): ThunkType => (dispatch) => {
    let promise = dispatch(setAuth());
    // @ts-ignore
    promise.then( () => {
        dispatch(initializedSuccesses());
    })

};

export default AuthReducer;