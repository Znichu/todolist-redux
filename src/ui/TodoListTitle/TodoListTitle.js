import React from 'react';
import style from "./TodoListTitle.module.css";
import {Icon} from "semantic-ui-react";

class TodoListTitle extends React.Component {
    render = () => {
        return (
            <>
                <h3 className={style.todoListHeader__title}>{this.props.title}</h3>
                <div className={style.todoListHeaderDelete}>
                    <Icon onClick={this.props.onDelete} name={"window close"} color={"red"} />
                </div>
            </>
        );
    }
}

export default TodoListTitle;

