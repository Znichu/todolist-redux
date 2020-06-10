import {v1} from "uuid";

const ADD_TODOLIST = "ADD_TODOLIST";
const DELETE_TODOLIST = "DELETE-TODOLIST";
const DELETE_TASK = "DELETE_TASK";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const CHANGE_FILTER = "CHANGE_FILTER";

const initialState = {
    todoLists: [
        {
            id: "7c03a130-aa36-11ea-b14d-1f75afd648c9",
            title: "fdfdfsdfs",
            tasks: [],
            filterValue: "All"
        }
    ]
};

const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TODOLIST:
            let newTodoList = {
                id: v1(),
                title: action.title,
                tasks: [],
                filterValue: "All"
            };
            return {
                ...state,
                todoLists: [...state.todoLists, newTodoList]
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
            let newTask = {
                id: v1(),
                title: action.newText,
                isDone: false,
                priority: "low"
            };
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, newTask]}
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
                    }  else {
                        return tl
                    }
                })
            }
        }
        default:
            return state;
    }
};

export const addTodoList = ( title ) => ({ type: ADD_TODOLIST, title });
export const addTask = ( newText, todoListId ) => ({ type:ADD_TASK, newText, todoListId });
export const deleteTodoList = ( todoListId ) => ({ type: DELETE_TODOLIST, todoListId });
export const deleteTask = ( taskId, todoListId ) => ({ type: DELETE_TASK, taskId, todoListId });
export const updateTask = ( taskId, obj, todoListId ) => ({ type: UPDATE_TASK, taskId, obj, todoListId });
export const changeFilterValue = (todoListId, filterValue) => ({ type:CHANGE_FILTER, todoListId, filterValue });

export default AppReducer;