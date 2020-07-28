import {todoListAPI} from "../api/api";
import {TaskType, TodoListType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, RootAppState} from "./store";
import orderBy from 'lodash.orderby';
import sortBy from "lodash.sortby";

const initialState = {
    todoLists: [] as Array<TodoListType>,
    isFetching: false
};

//Reducer
const AppReducer = (state: InitialState = initialState, action: ActionTypes): InitialState => {

    switch (action.type) {
        case "TODOLIST/SET_TODO_LISTS": {
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({...tl, tasks: [], filterValue: "All"}))
            }
        }
        case "TASK/SET_TASKS": {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            //модуль _.sortBy из библиотеки Lodash
                            tasks: orderBy(action.tasks, ['status', 'priority'], ['asc', 'desc'])
                        }
                    } else {
                        return tl;
                    }
                })
            }
        }
        case "TODOLIST/ADD_TODOLIST":
            return {
                ...state,
                todoLists: [...state.todoLists, action.todoList]
            };
        case "TODOLIST/DELETE-TODOLIST":
            return {
                ...state,
                todoLists: state.todoLists.filter(tl => tl.id !== action.todoListId)
            };
        case "TASK/DELETE_TASK":
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            };
        case "TASK/ADD_TASK":
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.task]}
                    } else {
                        return tl
                    }
                })
            };
        case "TASK/UPDATE_TASK":
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task;
                                } else {
                                    return { ...task, ...action.newTask };
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };
        case "TODOLIST/CHANGE_FILTER": {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            filterValue: action.filterValue
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        case "TODOLIST/UPDATE_TODO_LIST_TITLE": {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl, title: action.title
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        case "TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
};

//Actions
export const actions = {
    setTodoLists: (todoLists: Array<TodoListType>) => ({type: "TODOLIST/SET_TODO_LISTS", todoLists} as const),
    setTasks: (todoListId: string, tasks: Array<TaskType>) => ({
        type: "TASK/SET_TASKS",
        todoListId,
        tasks
    } as const),
    appendTodoList: (todoList: TodoListType) => ({type: "TODOLIST/ADD_TODOLIST", todoList} as const),
    appendTask: (task: TaskType, todoListId: string) => ({type: "TASK/ADD_TASK", task, todoListId} as const),
    removeTodoList: (todoListId: string) => ({type: "TODOLIST/DELETE-TODOLIST", todoListId} as const),
    removeTask: (todoListId: string, taskId: string) => ({type: "TASK/DELETE_TASK", todoListId, taskId} as const),
    changeTask: (todoListId: string, taskId: string, newTask: TaskType) => ({
        type: "TASK/UPDATE_TASK",
        todoListId,
        taskId,
        newTask
    } as const),
    changeFilterValue: (todoListId: string, filterValue: string) => ({
        type: "TODOLIST/CHANGE_FILTER",
        todoListId,
        filterValue
    } as const),
    changeTodoListTitle: (todoListId: string, title: string) => ({
        type: "TODOLIST/UPDATE_TODO_LIST_TITLE",
        todoListId,
        title
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const)
}

//Thunk
export const getTodoLists = (): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await todoListAPI.getTodoLists()
    dispatch(actions.setTodoLists(data))
};
export const getTasks = (todoListId: string): ThunkType => async (dispatch) => {
    let data = await todoListAPI.getTasks(todoListId)
    if (data.error === null) {
        dispatch(actions.setTasks(todoListId, data.items));
        dispatch(actions.toggleIsFetching(false));
    }
};
export const addTodoList = (title: string): ThunkType => async (dispatch) => {
    let data = await todoListAPI.addTodoList(title)
    if (data.resultCode === 0) {
        dispatch(actions.appendTodoList(data.data.item))
    }
};
export const addTask = (title: string, todoListId: string): ThunkType => async (dispatch) => {
    let data = await todoListAPI.addTask(title, todoListId)
    if (data.resultCode === 0) {
        dispatch(actions.appendTask(data.data.item, todoListId))
    }
};
export const deleteTodoList = (todoListId: string): ThunkType => async (dispatch) => {
    let data = await todoListAPI.deleteTodoList(todoListId)
    if (data.resultCode === 0) {
        dispatch(actions.removeTodoList(todoListId))
    }
};
export const deleteTask = (todoListId: string, taskId: string): ThunkType => async (dispatch) => {
    let data = await todoListAPI.deleteTask(todoListId, taskId)
    if (data.resultCode === 0) {
        dispatch(actions.removeTask(todoListId, taskId))
    }
};
export const updateTask = (todoListId: string, taskId: string, newTask: TaskType): ThunkType => async (dispatch) => {
    let data = await todoListAPI.updateTask(todoListId, taskId, newTask)
    if (data.resultCode === 0) {
        dispatch(actions.changeTask(todoListId, taskId, data.data.item))
    }
};
export const updateTodoListTitle = (todoListId: string, title: string): ThunkType => async (dispatch) => {
    await todoListAPI.updateTodoListTitle(todoListId, title)
    dispatch(actions.changeTodoListTitle(todoListId, title))
};

export default AppReducer;

type ActionTypes = InferActionTypes<typeof actions>
type InitialState = typeof initialState
type ThunkType = ThunkAction<void, RootAppState, unknown, ActionTypes>
