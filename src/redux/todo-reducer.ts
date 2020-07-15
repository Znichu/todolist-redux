import {todoListAPI} from "../api/api";
import {TaskType, TodoListType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {RootAppState} from "./store";

const ADD_TODOLIST = "TodoList/ADD_TODOLIST";
const DELETE_TODOLIST = "TodoList/DELETE-TODOLIST";
const DELETE_TASK = "Task/DELETE_TASK";
const ADD_TASK = "Task/ADD_TASK";
const UPDATE_TASK = "Task/UPDATE_TASK";
const UPDATE_TODO_LIST_TITLE = "TodoList/UPDATE_TODO_LIST_TITLE";
const CHANGE_FILTER = "TodoList/CHANGE_FILTER";
const SET_TODO_LISTS = "TodoList/SET_TODO_LISTS";
const SET_TASKS = "Task/SET_TASKS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initialState = {
    todoLists: [] as Array<TodoListType>,
    isFetching: false
};

const AppReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {

    switch (action.type) {
        case SET_TODO_LISTS: {
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({...tl, tasks: [], filterValue: "All"}))
            }
        }
        case SET_TASKS: {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: action.tasks
                        }
                    } else {
                        return tl;
                    }
                })
            }
        }
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.todoList]
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(tl => tl.id !== action.todoListId)
            };
        case DELETE_TASK:
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
        case ADD_TASK:
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
        case UPDATE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.newTask};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };
        case CHANGE_FILTER: {
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
        case UPDATE_TODO_LIST_TITLE: {
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
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
};

type ActionsType = SetTodoListsType | SetTasksType | AppendTodoList | AppendTask | RemoveTodoList | RemoveTask |
    ChangeTask | ChangeFilterValue | ChangeTodoListTitle | ToggleIsFetchingActionType

type SetTodoListsType = {
    type: typeof SET_TODO_LISTS
    todoLists: Array<TodoListType>
}
export const setTodoLists = (todoLists: Array<TodoListType>): SetTodoListsType => ({type: SET_TODO_LISTS, todoLists});

type SetTasksType = {
    type: typeof SET_TASKS
    todoListId: string
    tasks: Array<TaskType>

}
export const setTasks = (todoListId: string, tasks: Array<TaskType>): SetTasksType => ({
    type: SET_TASKS,
    todoListId,
    tasks
});

type AppendTodoList = {
    type: typeof ADD_TODOLIST
    todoList: TodoListType
}
export const appendTodoList = (todoList: TodoListType): AppendTodoList => ({type: ADD_TODOLIST, todoList});

type AppendTask = {
    type: typeof ADD_TASK
    task: TaskType
    todoListId: string
}
export const appendTask = (task: TaskType, todoListId: string): AppendTask => ({type: ADD_TASK, task, todoListId});

type RemoveTodoList = {
    type: typeof DELETE_TODOLIST
    todoListId: string
}
export const removeTodoList = (todoListId: string): RemoveTodoList => ({type: DELETE_TODOLIST, todoListId});

type RemoveTask = {
    type: typeof DELETE_TASK
    todoListId: string
    taskId: string
}
export const removeTask = (todoListId: string, taskId: string): RemoveTask => ({type: DELETE_TASK, todoListId, taskId});

type ChangeTask = {
    type: typeof UPDATE_TASK
    todoListId: string
    taskId: string
    newTask: TaskType
}
export const changeTask = (todoListId: string, taskId: string, newTask: TaskType): ChangeTask => ({
    type: UPDATE_TASK,
    todoListId,
    taskId,
    newTask
});

type ChangeFilterValue = {
    type: typeof CHANGE_FILTER
    todoListId: string
    filterValue: string
}
export const changeFilterValue = (todoListId: string, filterValue: string): ChangeFilterValue => ({
    type: CHANGE_FILTER,
    todoListId,
    filterValue
});

type ChangeTodoListTitle = {
    type: typeof UPDATE_TODO_LIST_TITLE
    todoListId: string
    title: string
}
export const changeTodoListTitle = (todoListId: string, title: string): ChangeTodoListTitle => ({
    type: UPDATE_TODO_LIST_TITLE,
    todoListId,
    title
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});


export const getTodoLists = (): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await todoListAPI.getTodoLists()
        dispatch(setTodoLists(data))
    }
};
export const getTasks = (todoListId: string): ThunkType => {
    return async (dispatch) => {
        let data = await todoListAPI.getTasks(todoListId)
        if (data.error === null) {
            dispatch(setTasks(todoListId, data.items));
            dispatch(toggleIsFetching(false));
        }
    }
};
export const addTodoList = (title: string): ThunkType => {
    return async (dispatch) => {
        let data = await todoListAPI.addTodoList(title)
        if (data.resultCode === 0) {
            dispatch(appendTodoList(data.data.item))
        }
    }
};
export const addTask = (title: string, todoListId: string): ThunkType => {
    return async (dispatch) => {
        let data = await todoListAPI.addTask(title, todoListId)
        if (data.resultCode === 0) {
            dispatch(appendTask(data.data.item, todoListId))
        }
    }
};
export const deleteTodoList = (todoListId: string): ThunkType => {
    return async (dispatch) => {
        let data = await todoListAPI.deleteTodoList(todoListId)
        if (data.resultCode === 0) {
            dispatch(removeTodoList(todoListId))
        }
    }
};
export const deleteTask = (todoListId: string, taskId: string): ThunkType => {
    return async (dispatch) => {
        let data = await todoListAPI.deleteTask(todoListId, taskId)
        if (data.resultCode === 0) {
            dispatch(removeTask(todoListId, taskId))
        }
    }
};
export const updateTask = (todoListId: string, taskId: string, newTask: TaskType): ThunkType => {
    return async (dispatch) => {
        let data = await todoListAPI.updateTask(todoListId, taskId, newTask)
        if (data.resultCode === 0) {
            dispatch(changeTask(todoListId, taskId, data.data.item))
        }
    }
};
export const updateTodoListTitle = (todoListId: string, title: string): ThunkType => {
    return async (dispatch) => {
        await todoListAPI.updateTodoListTitle(todoListId, title)
        dispatch(changeTodoListTitle(todoListId, title))
    }
};


export default AppReducer;

type InitialState = typeof initialState
type ThunkType = ThunkAction<void, RootAppState, unknown, ActionsType>
