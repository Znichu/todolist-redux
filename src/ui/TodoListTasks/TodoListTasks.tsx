import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";
import {ObjType, TaskType} from "../../types/types";
import style from "./TodoListTasks.module.css"

type Props = {
    tasks: Array<TaskType>
    changePriority: (taskId: string, task: TaskType, priority: number) => void
    changeStatus: (taskId: string, task: TaskType, status: number) => void
    editTask: (taskId: string, task: TaskType, obj: ObjType) => void
    deleteTask: (taskId: string) => void
}


class TodoListTasks extends React.Component<Props> {
    render = () => {
        let tasksElements = this.props.tasks.map( task => <TodoListTask task={task}
                                                                        changePriority={this.props.changePriority}
                                                                        changeStatus={this.props.changeStatus}
                                                                        editTask={this.props.editTask}
                                                                        key={task.id}
                                                                        deleteTask={this.props.deleteTask}
                                                                        />);

        return (
            <div className={style.todoListTasks}>
                {tasksElements}
            </div>
        );
    }
}


export default TodoListTasks;

