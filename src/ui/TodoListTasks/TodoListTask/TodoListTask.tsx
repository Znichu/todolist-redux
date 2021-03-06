import React, {FormEvent} from 'react';
import '../../../App.css';
import {Checkbox, CheckboxProps, Popup, Segment} from "semantic-ui-react";
import style from "./TodoListTask.module.css"
import classNames from 'classnames'
import TaskMenu from "../../../components/MenuForTask/TaskMenu";
import {ObjType, TaskType} from "../../../types/types";
import {ModalEditTask} from "../../../components/ModalEditTask/ModalEditTask";
import moment from "moment";


type State = {
    editMode: boolean
    title: string
}
type OwnProps = {
    task: TaskType
    changePriority: (taskId: string, task: TaskType, priority: number) => void
    changeStatus: (taskId: string, task: TaskType, status: number) => void
    editTask: (taskId: string, task: TaskType, obj: ObjType) => void
    deleteTask: (taskId: string) => void
}

class TodoListTask extends React.Component<OwnProps, State> {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    render = () => {

        let segmentColors : 'red' | 'orange' | 'yellow'
        | 'olive'
        | 'green'
        | 'teal'
        | 'blue'
        | 'violet'
        | 'purple'
        | 'pink'
        | 'brown'
        | 'grey'
        | 'black'

        // @ts-ignore
        segmentColors = classNames ({
            'green': this.props.task.priority === 0,
            'yellow': this.props.task.priority === 1,
            'orange': this.props.task.priority === 2,
            'red': this.props.task.priority === 3,
            'blue': this.props.task.priority === 4,
            'grey': this.props.task.status === 2,
        });
        console.log();
        let status = this.props.task.status === 2;
        let taskItem = classNames(style.list, style.listCard);
        let addTaskDate = moment(this.props.task.addedDate).format("DD.MM.YYYY");

        const stylePopup = {
            borderRadius: '4px',
            opacity: 0.7,
        }

        return (
            <Segment className={style.taskSegment} color={segmentColors} >
                <div className={style.todoListTask}>
                    <Checkbox checked={status} title={this.props.task.title} onChange={this.onIsDoneChanged}/>
                    {this.state.editMode
                        ?
                        <ModalEditTask
                            title={this.props.task.title}
                            description={this.props.task.description}
                            priority={this.props.task.priority}
                            open={this.state.editMode}
                            onClose={this.deactivateEditMode}
                            editTask={this.editTask}
                            startDate={this.props.task.startDate}
                            deadline={this.props.task.deadline}
                        />
                        :
                        <Popup
                                trigger={<div className={taskItem}><span
                                className={style.task}>{this.props.task.title}</span></div>}
                                content={`Added: ${addTaskDate}`}
                                position='right center'
                                style={stylePopup}
                                inverted
                        />
                    }
                    <div className={style.editBlock}>
                        <TaskMenu
                            onChange={this.onPriorityChanged}
                            onDeleteTask={this.onDeleteTask}
                            activateEditMode={this.activateEditMode}
                        />
                    </div>
                </div>
            </Segment>
        );
    };

    onIsDoneChanged = (e: FormEvent<HTMLInputElement>, {checked}: CheckboxProps) => {
        let status = checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, this.props.task, status);
    };

    editTask = (obj: ObjType) => {
        this.props.editTask(this.props.task.id, this.props.task, obj);
        this.setState({editMode: false});
    };
    onPriorityChanged = (value: number) => {
        this.props.changePriority(this.props.task.id, this.props.task, value)
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
    };
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };
}

export default TodoListTask;

