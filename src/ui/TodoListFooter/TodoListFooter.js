import React from 'react';
import '../../App.css';
import {Button} from "semantic-ui-react";

class TodoListFooter extends React.Component {

    state = {
        isHidden: false
    };
    onAllFilter = () => { this.props.changeFilterValue("All") };
    onCompletedFilter = () => { this.props.changeFilterValue("Completed") };
    onActiveFilter = () => { this.props.changeFilterValue("Active") };

    onShowFiltersClick = () => { this.setState({isHidden: true}) };
    onHideFiltersClick = () => { this.setState({isHidden: false}) };

    render () {

        let all = this.props.filterValue === "All" ? true : null;
        let completed = this.props.filterValue === "Completed" ? true : null;
        let active = this.props.filterValue === "Active" ? true : null;

        return (
            <div className="todoList-footer">
                { !this.state.isHidden &&
                    <Button.Group size="tiny" color="blue">
                        <Button active={all} onClick={ this.onAllFilter }>All</Button>
                        <Button active={completed} onClick={ this.onCompletedFilter }>Completed</Button>
                        <Button active={active} onClick={ this.onActiveFilter }>Active</Button>
                    </Button.Group>
                }
                { !this.state.isHidden && <Button size="tiny" color="blue" onClick={this.onShowFiltersClick}>Hide</Button> }
                { this.state.isHidden && <Button size="tiny"  color="blue" onClick={this.onHideFiltersClick}>Show</Button> }
            </div>
        );
    }
}

export default TodoListFooter;

