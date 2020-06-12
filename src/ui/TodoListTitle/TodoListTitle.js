import React from 'react';
import style from "./TodoListTitle.module.css";
import {Icon, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {updateTodoListTitle} from "../../redux/todo-reducer";

class TodoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title
    };

    render = () => {
        return (
            <>
                {!this.state.editMode
                    ? <div className={style.todoListHeader__title}>
                        <h3 onClick={this.activateEditMode}>{this.props.title}</h3>
                    </div>
                    : <Input focus={true} onChange={this.onTitleChanged} onBlur={this.deactivateEditMode}
                             value={this.state.title}/>
                }
                <div className={style.todoListHeaderDelete}>
                    <Icon onClick={this.props.onDelete} name={"window close"} color={"red"}/>
                </div>
            </>
        );
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };
    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false, title: ""});
        this.props.updateTodoListTitle(this.props.id, this.state.title);
    };
}


export default connect(null, {updateTodoListTitle})(TodoListTitle);

