import React from 'react';
import '../../../App.css';
import SelectPriority from "../../../components/SelectPriority/SelectPriority";
import {Checkbox, Segment} from "semantic-ui-react";
import style from "./TodoListTask.module.css"
import classNames from 'classnames'
import TaskMenu from "../../../components/MenuForTask/TaskMenu";


class TodoListTask extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    render = () => {
        let color = this.props.task.status === 2 ? "green" : "blue";
        let status = this.props.task.status === 2;
        let taskItem = classNames(style.list, style.listCard);
        return (
                <div className={style.todoListTask}>
                        <Checkbox checked={status} title={this.props.task.title} onChange={this.onIsDoneChanged} />
                        {this.state.editMode
                            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                     value={this.state.title}/>
                            : <div  className={taskItem}><span className={style.task}>{this.props.task.title}</span> </div>

                        }
                    <div className={style.priority}>
                        { this.props.task.status !== 2 &&
                        <SelectPriority onChange={this.onPriorityChanged} defaultValue={this.props.task.priority}/>
                        }
                    </div>
                    <div className={style.editBlock}>
                        <TaskMenu onDeleteTask={this.onDeleteTask} activateEditMode={this.activateEditMode} />
                    </div>
                </div>
        );
    };

    onIsDoneChanged = (e, {checked}) => {
        let status = checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, this.props.task, status);
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };
    onPriorityChanged = (e, {value}) => {
        this.props.changePriority(this.props.task.id, this.props.task, value)
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task.id, this.props.task, this.state.title);
    };
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };
}

export default TodoListTask;

