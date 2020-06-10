import React from 'react';
import style from "./TodoList.module.css"
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeFilterValue, deleteTask, deleteTodoList, updateTask} from "../redux/todo-reducer";

class TodoList extends React.Component {

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
    };

    changeTask = (taskId, obj) => {
        this.props.updateTask(taskId, obj, this.props.id)
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    changePriority = (taskId, priority) => {
        this.changeTask(taskId, {priority: priority})
    };

    changeFilterValue = (filterValue) => {
        this.props.changeFilterValue(this.props.id, filterValue)
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    };

    render = () => {
        return (
                <div className={style.todoList}>
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title} onDelete={this.deleteTodoList}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   changePriority={this.changePriority}
                                   deleteTask={this.deleteTask}
                                   tasks={this.props.tasks.filter(t => {
                                       switch (this.props.filterValue) {
                                           case "Completed":
                                               return t.isDone === true;
                                           case "Active":
                                               return t.isDone === false;
                                           default:
                                               return true
                                       }
                                   })}
                    />
                    <TodoListFooter changeFilterValue={this.changeFilterValue} filterValue={this.props.filterValue}/>
                </div>
        );
    }
}


export default connect(null, {addTask, deleteTodoList, deleteTask, updateTask, changeFilterValue})(TodoList);

