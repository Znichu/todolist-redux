import React from 'react';
import '../../../App.css';
import {Checkbox, Popup, Segment} from "semantic-ui-react";
import style from "./TodoListTask.module.css"
import classNames from 'classnames'
import TaskMenu from "../../../components/MenuForTask/TaskMenu";
import {formatDate} from "../../../utils/FormateDate";


class TodoListTask extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    render = () => {

        let color = classNames({
            'green': this.props.task.priority === 0,
            'yellow': this.props.task.priority === 1,
            'orange': this.props.task.priority === 2,
            'red': this.props.task.priority === 3,
            'blue': this.props.task.priority === 4,
            'grey': this.props.task.status === 2,
        });
        let status = this.props.task.status === 2;
        let taskItem = classNames(style.list, style.listCard);
        let formatTaskDate = formatDate(this.props.task.addedDate);
        return (
            <Segment className={style.taskSegment} color={color}>
                <div className={style.todoListTask}>
                        <Checkbox checked={status} title={this.props.task.title} onChange={this.onIsDoneChanged} />
                        {this.state.editMode
                            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                     value={this.state.title}/>
                            : <Popup
                                trigger={ <div  className={taskItem}><span className={style.task}>{this.props.task.title}</span> </div> }
                                content={"Added: " + formatTaskDate }
                                position='bottom center'
                            />

                        }

                    <div className={style.editBlock}>
                        <TaskMenu onChange={this.onPriorityChanged} onDeleteTask={this.onDeleteTask} activateEditMode={this.activateEditMode} />
                    </div>

                </div>
            </Segment>
        );
    };

    onIsDoneChanged = (e, {checked}) => {
        let status = checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, this.props.task, status);
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };
    onPriorityChanged = (value) => {
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

