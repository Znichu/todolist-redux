import React, {ChangeEvent} from 'react';
import style from "./TodoListTitle.module.css";
import {Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {updateTodoListTitle} from "../../redux/todo-reducer";

type State = {
    editMode: boolean
    title: string
    error: boolean
}
type MapDispatchProps = {
    updateTodoListTitle: (todoListId: string, title: string) => void
}

type OwnProps = {
    title: string
    id: string
}
type Props = MapDispatchProps & OwnProps


class TodoListTitle extends React.Component<Props, State> {
    state: State = {
        editMode: false,
        title: this.props.title,
        error: false
    };

    render = () => {

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
                             error={this.state.error}
                             onKeyPress={ this.onKeyPress }
                             size='mini'
                    />
                }
            </>
        );
    };

    onKeyPress = (e: React.KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === "Enter") {
            this.deactivateEditMode();
        }
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };
    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        if (this.state.title === "") {
            this.setState({ error: true })
        } else {
            this.setState({editMode: false});
            this.props.updateTodoListTitle(this.props.id, this.state.title);
        }
    };

}


export default connect(null, {updateTodoListTitle})(TodoListTitle);

