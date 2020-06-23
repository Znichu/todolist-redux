import React from 'react';
import '../../../App.css';
import SelectPriority from "../../../components/SelectPriority/SelectPriority";
import {Checkbox, Icon, Segment} from "semantic-ui-react";
import PopupButtons from "../../../components/PopupDelete/PopupButtons";
import style from "./TodoListTask.module.css"
class TodoListTask extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    render = () => {
        let color = this.props.task.status === 2 ? "green" : "blue";
        let textStyle = this.props.task.status === 2 ? style.complete : null;
        let status = this.props.task.status === 2;
        return (
            <Segment raised color={color} size={"small"}>
                <div className={style.todoListTask}>
                        <Checkbox checked={status} onChange={this.onIsDoneChanged} />
                        {this.state.editMode
                            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                     value={this.state.title}/>
                            : <div className={style.task}> <span className={textStyle}>{this.props.task.title}</span> </div>

                        }
                    <div className={style.priority}>
                        { this.props.task.status !== 2 &&
                        <SelectPriority onChange={this.onPriorityChanged} defaultValue={this.props.task.priority}/>
                        }
                    </div>
                    <div className={style.editBlock}>
                        { this.props.task.status !== 2 &&
                        <Icon onClick={this.activateEditMode} name='edit outline' color='green'/>
                        }
                        <PopupButtons onDeleteTask={this.onDeleteTask}/>
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

