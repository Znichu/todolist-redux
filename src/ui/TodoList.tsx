import React from 'react';
import style from "./TodoList.module.css"
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListTitle from "./TodoListTitle/TodoListTitle";
import AddNewItemForm from "../components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeFilterValue, deleteTask, deleteTodoList, getTasks, updateTask} from "../redux/todo-reducer";
import {Icon, Segment} from "semantic-ui-react";
import TodoListMenu from "../components/MenuForTodoList/TodoListMenu";
import {ObjType, TaskType} from "../types/types";
import {RootAppState} from "../redux/store";

type State = {
    editMode: boolean
}

type MapDispatchProps = {
    addTask: (title: string, todoListId: string) => void
    deleteTodoList: (todoListId: string) => void
    deleteTask: (todoListId: string, taskId: string) => void
    updateTask: (todoListId: string, taskId: string, newTask: TaskType) => void
    changeFilterValue: (todoListId: string, filterValue: string) => void
    getTasks: (todoListId: string) => void
}

type OwnProps = {
    tasks: Array<TaskType>
    title: string
    id: string
    filterValue: string
}

type Props = MapDispatchProps & OwnProps


class TodoList extends React.Component<Props, State> {

    state: State = {
        editMode: false,
    };

    componentDidMount() {
        this.props.getTasks(this.props.id )
    }

    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id)
    };

    changeTask = (taskId: string, task: TaskType, obj: ObjType) => {
        let newTask = {...task, ...obj};
        this.props.updateTask(this.props.id, taskId, newTask)
    };

    changeStatus = (taskId: string, task: TaskType, status: number) => {
        this.changeTask(taskId, task, {status: status})
    };

    changeTitle = (taskId: string, task: TaskType, title: string) => {
        this.changeTask(taskId, task, {title: title})
    };

    changePriority = (taskId: string, task: TaskType, priority: number) => {
        this.changeTask(taskId, task, {priority: priority})
    };

    changeFilterValue = (filterValue: string) => {
        this.props.changeFilterValue(this.props.id, filterValue)
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };

    deleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    };
    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
    };

    render = () => {
        let {tasks = []} = this.props;
        console.log(this.props);
        return (
            <div className={style.todoList}>
                    <div className={style.todoListDelete}>
                        <TodoListMenu
                            changeFilterValue={this.changeFilterValue}
                            deleteTodoList={this.deleteTodoList}
                        />
                    </div>
                    <div className={style.todoListHeader}>
                        <TodoListTitle title={this.props.title}
                                       id={this.props.id}
                        />
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
                    <div className={style.editBlock}>
                        {!this.state.editMode
                            ? <>
                            <span
                                className={style.addCard}
                                onClick={this.activateEditMode}>
                                <Icon name='plus' className={style.iconAdd}/>
                                Add task
                            </span>
                            </>
                            : <AddNewItemForm
                                deactivateEditMode={this.deactivateEditMode}
                                onBlur={this.deactivateEditMode}
                                autoFocus={true}
                                size={"mini"}
                                addItem={this.addTask}/>
                        }
                    </div>
            </div>
        );
    }
}

/*let mapStateToProps = (state) => ({
    filteredTasks: getFilteredTask(state)
})*/


export default connect<{}, MapDispatchProps, OwnProps, RootAppState>(null, {addTask, deleteTodoList, deleteTask, updateTask, changeFilterValue, getTasks})(TodoList);

