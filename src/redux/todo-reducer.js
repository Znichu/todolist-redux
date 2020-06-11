import {todoListAPI} from "../api/api";

const ADD_TODOLIST = "ADD_TODOLIST";
const DELETE_TODOLIST = "DELETE-TODOLIST";
const DELETE_TASK = "DELETE_TASK";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const CHANGE_FILTER = "CHANGE_FILTER";
const SET_TODO_LISTS = "SET_TODO_LISTS";
const SET_TASKS = "SET_TASKS";

const initialState = {
    todoLists: []
};

const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TODO_LISTS: {
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({...tl, tasks: []}))
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
                                    return {...t, ...action.obj};
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
        default:
            return state;
    }
};

export const setTodoLists = (todoLists) => ({type: SET_TODO_LISTS, todoLists});
export const setTasks = (todoListId, tasks) => ({type: SET_TASKS, todoListId, tasks});
export const appendTodoList = (todoList) => ({type: ADD_TODOLIST, todoList});
export const appendTask = (task, todoListId) => ({type: ADD_TASK, task, todoListId});
export const removeTodoList = (todoListId) => ({type: DELETE_TODOLIST, todoListId});
export const deleteTask = (taskId, todoListId) => ({type: DELETE_TASK, taskId, todoListId});
export const updateTask = (taskId, obj, todoListId) => ({type: UPDATE_TASK, taskId, obj, todoListId});
export const changeFilterValue = (todoListId, filterValue) => ({type: CHANGE_FILTER, todoListId, filterValue});

export const getTodoLists = () => {
    return (dispatch) => {
        todoListAPI.getTodoLists()
            .then(data => {
                dispatch(setTodoLists(data))
            })
    }
};
export const getTasks = (todoListId) => {
    return (dispatch) => {
        todoListAPI.getTasks(todoListId)
            .then(data => {
                if (data.error === null) {
                    dispatch(setTasks(todoListId, data.items))
                }
            })
    }

};
export const addTodoList = (title) => {
    return (dispatch) => {
        todoListAPI.addTodoList(title)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(appendTodoList(data.data.item))
                }
            })
    }
}
export const deleteTodoList = (todoListId) => {
    return (dispatch) => {
        todoListAPI.deleteTodoList(todoListId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(removeTodoList(todoListId))
                }
            })
    }
};
export const addTask = (title, todoListId) => {
    return (dispatch) => {
        todoListAPI.addTask(title, todoListId)
            .then(data => {
                debugger
                if (data.resultCode === 0) {
                    debugger
                    dispatch(appendTask(data.data.item, todoListId))
                }
            })
    }
}


export default AppReducer;