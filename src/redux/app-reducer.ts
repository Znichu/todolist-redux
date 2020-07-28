import {todoListAPI} from "../api/api";
import {getTodoLists} from "./todo-reducer";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootAppState} from "./store";

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    initialized: false
};

const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "APP/SET_AUTH_DATA": {
            return {
                ...state,
                ...action.payload
            }
        }
        case "APP/INITIALIZED_SUCCESSES":
            return {
                ...state,
                initialized: true

            };
        default:
            return state
    }
};

//Actions
export const actions = {
    setAuthData: (id: string | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: "APP/SET_AUTH_DATA",
        payload: {id, login, email, isAuth}
    } as const),
    initializedSuccesses: () => ({type: "APP/INITIALIZED_SUCCESSES"} as const )
}

//Thunk
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    let data = await todoListAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(setAuth());
        dispatch(getTodoLists());
    }
};
export const logout = (): ThunkType => async (dispatch) => {
    let data = await todoListAPI.logout()
    if (data.resultCode === 0) {
        dispatch(actions.setAuthData(null, null, null, false))
    }
};

export const setAuth = (): ThunkType => async (dispatch) => {
    let data = await todoListAPI.getAuth()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(actions.setAuthData(id, login, email, true))
    }
};

export const initialized = (): ThunkType => (dispatch) => {
    let promise = dispatch(setAuth());
    // @ts-ignore
    promise.then(() => {
        dispatch(actions.initializedSuccesses());
    })

};

export default AuthReducer;
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, RootAppState, unknown, ActionsTypes>
type InitialStateType = {
    id: null | string
    email: null | string
    login: null | string
    isAuth: boolean
    initialized: boolean
}