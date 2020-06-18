import React from 'react';
import style from "./TodoListTitle.module.css";
import {Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {updateTodoListTitle} from "../../redux/todo-reducer";

class TodoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title,
        error: false
    };

    render = () => {

        let errorTitleTodoList = this.state.error ? "error" : null;

        return (
            <>
                {!this.state.editMode
                    ? <div className={style.todoListHeader__title}>
                        <h3 onClick={this.activateEditMode}>{this.props.title}</h3>
                    </div>
                    : <Input focus={true}
                             onChange={this.onTitleChanged}
                             onBlur={this.deactivateEditMode}
                             autoFocus={true}
                             value={this.state.title}
                             error={errorTitleTodoList}
                             onKeyPress={ this.onKeyPress }
                    />
                }
            </>
        );
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.deactivateEditMode();
        }
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };
    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        if (this.state.title === "") {
            this.setState({ error: true })
        } else {
            this.setState({editMode: false, title: ""});
            this.props.updateTodoListTitle(this.props.id, this.state.title);
        }
    };

}


export default connect(null, {updateTodoListTitle})(TodoListTitle);

