import React from 'react';
import '../../App.css';
import TodoListTask from "./TodoListTask/TodoListTask";


class TodoListTasks extends React.Component {
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

