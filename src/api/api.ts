import axios from "axios";
import {SetAuthType, TaskType, TodoListType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {"API-KEY": "6b2fd528-e763-4090-9008-f558677adae7"}
});

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}
type GetTasks = {
    error: null
    totalCount: number
    items: Array<TaskType>
}

export const todoListAPI = {
    getTodoLists () {
        return instance.get<Array<TodoListType>>("/todo-lists")
            .then(response => response.data)
    },
    getTasks (todoListId: string) {
        return instance.get<GetTasks>(`/todo-lists/${todoListId}/tasks`)
            .then(response => response.data)
    },
    getAuth () {
        return instance.get<CommonResponseType<SetAuthType>>("/auth/me")
            .then(response => response.data)
    },
    addTodoList (title: string) {
      return instance.post<CommonResponseType<{item: TodoListType}>>("/todo-lists", {title})
          .then(response => response.data)
    },
    addTask ( title: string, todoListId: string ) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks` , {title})
            .then(response => response.data)
    },
    deleteTodoList (todoListId: string) {
        return instance.delete<CommonResponseType>("/todo-lists/" + todoListId)
            .then(response => response.data)
    },
    deleteTask (todoListId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
            .then(response => response.data)
    },
    updateTask (todoListId: string, taskId: string, newTask: TaskType) {
        return instance.put<CommonResponseType<{item: TaskType}>>(`/todo-lists/${todoListId}/tasks/${taskId}`, {...newTask})
            .then(response => response.data)
    },
    updateTodoListTitle (todoListId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todoListId}`, {title})
            .then(response => response.data)
    },
    login (email: string, password: string, rememberMe: boolean = false) {
        return instance.post<CommonResponseType<{userId: string}>>("/auth/login", {email, password, rememberMe})
            .then(response => response.data)
    },
    logout () {
        return instance.delete<CommonResponseType>("/auth/login")
            .then(response => response.data)
    },
};