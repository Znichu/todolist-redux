import React from 'react';
import './App.css';
import TodoList from "./ui/TodoList";
import AddNewItemForm from "./components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoLists} from "./redux/todo-reducer";
import {initialized, login, logout, setAuth} from "./redux/app-reducer";
import Avatar from "./components/Avatar/Avatar";
import LoginForm from "./components/Form/LoginForm";
import {Header} from "semantic-ui-react";


class App extends React.Component {

    componentDidMount() {
        this.props.initialized();
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


        if (!this.props.isAuth) {
            return <LoginForm login={this.props.login}/>
        }
        return (
                <div className="App">
                    <div className="headerAuth">
                        <Avatar logout={this.props.logout} userName={this.props.userName}/>
                    </div>
                    <Header as="h1" color="white" textAlign="center">
                        Todo List App
                    </Header>
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
    isAuth: state.auth.isAuth,
    userName: state.auth.login,
    initialized: state.auth.initialized

});

const ConnectedApp = connect(mapStateToProps, {addTodoList, getTodoLists, initialized, setAuth, login, logout})(App);


export default ConnectedApp;

