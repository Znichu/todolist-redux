import React from 'react';
import './App.css';
import TodoList from "./ui/TodoList";
import AddNewItemForm from "./components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList} from "./redux/todo-reducer";

class App extends React.Component {

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
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    todoLists: state.app.todoLists,

});

const ConnectedApp = connect(mapStateToProps, { addTodoList })(App);


export default ConnectedApp;

