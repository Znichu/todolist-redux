import React from 'react';
import './App.css';
import TodoList from "./ui/TodoList";
import AddNewItemForm from "./components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoLists} from "./redux/todo-reducer";


class App extends React.Component {

    componentDidMount() {
        this.props.getTodoLists();
    }

    addTodoList = (title) => {
        this.props.addTodoList(title);
    };

    render = () => {
        const todoLists = this.props
            .todoLists
            .map(tl => <TodoList key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tl.tasks}
                                 filterValue={tl.filterValue}
            />);

        return (
            <div className="App">
                <div className="containerInput">
                    <AddNewItemForm size={"small"} addItem={this.addTodoList}/>
                </div>
                <div className="containerList">
                    {todoLists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    todoLists: state.app.todoLists,

});

const ConnectedApp = connect(mapStateToProps, {addTodoList, getTodoLists})(App);


export default ConnectedApp;

