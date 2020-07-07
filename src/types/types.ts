export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
    filterValue: string
    tasks: Array<TaskType>
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type SetAuthType = {
    email: string
    id: string
    login: string
}

export type ObjType = {
    status?: number
    title?: string
    priority?: number
}