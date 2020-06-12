import React from 'react';
import style from "./TodoList.module.css"
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeFilterValue, deleteTask, deleteTodoList, getTasks, updateTask} from "../redux/todo-reducer";
import {Message, Segment} from "semantic-ui-react";

class TodoList extends React.Component {

    state = {
        editMode: false
    };

    componentDidMount() {
        this.props.getTasks(this.props.id)
    }

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
    };

    changeTask = (taskId, task, obj) => {
        this.props.updateTask(this.props.id, taskId, task, obj)
    };

    changeStatus = ( taskId, task, status) => {
        this.changeTask(taskId, task, {status: status})
    };

    changeTitle = (taskId, task, title) => {
        this.changeTask(taskId, task, {title: title})
    };

    changePriority = (taskId, task, priority) => {
        this.changeTask(taskId, task, {priority: priority})
    };

    changeFilterValue = (filterValue) => {
        this.props.changeFilterValue(this.props.id, filterValue)
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    };
    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false, title: ""});
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
                <div className={style.todoList}>
                    <Segment stacked>
                    <div className={style.todoListHeader}>
                        <TodoListTitle title={this.props.title}
                                       onDelete={this.deleteTodoList}
                                       id={this.props.id}
                        />
                        <div className={style.editBlock}>
                        { !this.state.editMode
                            ? <Message onClick={this.activateEditMode} size={"mini"} floating>Way to go!</Message>
                            : <AddNewItemForm deactivateEditMode={this.deactivateEditMode} size={"mini"} addItem={this.addTask}/>
                        }
                        </div>
                    </div>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   changePriority={this.changePriority}
                                   deleteTask={this.deleteTask}
                                   tasks={tasks.filter(t => {
                                       switch (this.props.filterValue) {
                                           case "Completed":
                                               return t.status === 2;
                                           case "Active":
                                               return t.status === 0;
                                           default:
                                               return true
                                       }
                                   })}
                    />
                    <TodoListFooter changeFilterValue={this.changeFilterValue} filterValue={this.props.filterValue}/>
                    </Segment>
                </div>
        );
    }
}


export default connect(null, {addTask, deleteTodoList, deleteTask, updateTask, changeFilterValue, getTasks})(TodoList);

