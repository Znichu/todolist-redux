import React from 'react';
import style from "./TodoList.module.css"
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeFilterValue, deleteTask, deleteTodoList, getTasks, updateTask} from "../redux/todo-reducer";
import {Segment} from "semantic-ui-react";

class TodoList extends React.Component {

    componentDidMount() {
        this.props.getTasks(this.props.id)
    }

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
        let {tasks = []} = this.props;
        return (
                <div className={style.todoList}>
                    <Segment stacked>
                    <div className={style.todoListHeader}>
                        <TodoListTitle title={this.props.title} onDelete={this.deleteTodoList}/>
                        <AddNewItemForm size={"mini"} addItem={this.addTask}/>
                    </div>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   changePriority={this.changePriority}
                                   deleteTask={this.deleteTask}
                                   tasks={tasks.filter(t => {
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
                    </Segment>
                </div>
        );
    }
}


export default connect(null, {addTask, deleteTodoList, deleteTask, updateTask, changeFilterValue, getTasks})(TodoList);

