import React from 'react';
import '../../../App.css';
import SelectPriority from "../../../components/SelectPriority/SelectPriority";
import {Checkbox, Header, Icon, Segment} from "semantic-ui-react";
import PopupButtons from "../../../components/PopupDelete/PopupButtons";
import style from "./TodoListTask.module.css"
class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    render = () => {
        let color = this.props.task.isDone ? "green" : "blue";
        return (
            <Segment raised color={color} size={"small"}>
                <div className={style.todoListTask}>
                        <Checkbox checked={this.props.task.isDone} onChange={this.onIsDoneChanged} />
                        {this.state.editMode
                            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                     value={this.props.task.title}/>
                            : <div className={style.task}> <span>{this.props.task.title}</span> </div>

                        }
                    <div className={style.priority}>
                        <SelectPriority onChange={this.onPriorityChanged} defaultValue={this.props.task.priority}/>
                    </div>
                    <div className={style.editBlock}>
                        <Icon onClick={this.activateEditMode} name='edit outline' color='green'/>
                        <PopupButtons onDeleteTask={this.onDeleteTask}/>
                    </div>
                </div>
            </Segment>

        );
    }

    onIsDoneChanged = (e, {checked}) => {
        this.props.changeStatus(this.props.task.id, checked);
    }

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    }
    onPriorityChanged = (e, {value}) => {
        this.props.changePriority(this.props.task.id, value)
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
}

export default TodoListTask;

