import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {"API-KEY": "6b2fd528-e763-4090-9008-f558677adae7"}
});

export const todoListAPI = {
    getTodoLists () {
        return instance.get("/todo-lists")
            .then(response => response.data)
    },
    getTasks (todoListId) {
        return instance.get(`/todo-lists/${todoListId}/tasks`)
            .then(response => response.data)
    },
    getAuth () {
        return instance.get("/auth/me")
            .then(response => response.data)
    },
    addTodoList (title) {
      return instance.post("/todo-lists", {title})
          .then(response => response.data)
    },
    addTask ( title, todoListId ) {
        return instance.post(`/todo-lists/${todoListId}/tasks` , {title})
            .then(response => response.data)
    },
    deleteTodoList (todoListId) {
        return instance.delete("/todo-lists/" + todoListId)
            .then(response => response.data)
    },
    deleteTask (todoListId, taskId) {
        return instance.delete(`/todo-lists/${todoListId}/tasks/${taskId}`)
            .then(response => response.data)
    },
    updateTask (todoListId, taskId, newTask) {
        return instance.put(`/todo-lists/${todoListId}/tasks/${taskId}`, {...newTask})
            .then(response => response.data)
    },
    updateTodoListTitle (todoListId, title) {
        return instance.put(`/todo-lists/${todoListId}`, {title})
            .then(response => response.data)
    },
    login (email, password, rememberMe = false) {
        return instance.post("/auth/login", {email, password, rememberMe})
            .then(response => response.data)
    },
    logout () {
        return instance.delete("/auth/login")
            .then(response => response.data)
    },
};