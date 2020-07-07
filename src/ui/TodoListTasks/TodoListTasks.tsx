import React from 'react';
import '../../App.css';
import TodoListTask from "./TodoListTask/TodoListTask";
import {TaskType} from "../../types/types";

type Props = {
    tasks: Array<TaskType>
    changePriority: (taskId: string, task: TaskType, priority: number) => void
    changeStatus: (taskId: string, task: TaskType, status: number) => void
    changeTitle: (taskId: string, task: TaskType, title: string) => void
    deleteTask: (taskId: string) => void
}


class TodoListTasks extends React.Component<Props> {
    render = () => {
        let tasksElements = this.props.tasks.map( task => <TodoListTask task={task}
                                                                        changePriority={this.props.changePriority}
                                                                        changeStatus={this.props.changeStatus}
                                                                        changeTitle={this.props.changeTitle}
                                                                        key={task.id}
                                                                        deleteTask={this.props.deleteTask}
                                                                        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}


export default TodoListTasks;
