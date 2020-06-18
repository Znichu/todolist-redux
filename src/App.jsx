import React from 'react';
import './App.css';
import TodoList from "./ui/TodoList";
import AddNewItemForm from "./components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoLists} from "./redux/todo-reducer";
import {login, logout, setAuth} from "./redux/app-reducer";
import Login from "./components/Form/Login";
import Avatar from "./components/Avatar/Avatar";


class App extends React.Component {

    componentDidMount() {
        this.props.setAuth();
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
            return <div className="App"><Login login={this.props.login}/></div>
        }
        return (
            <div className="App">
                <div className="headerAuth">
                    <Avatar logout={this.props.logout} userName={this.props.userName}/>
                </div>
                <div className="headerTitle">
                    <h1>TodoList </h1>
                </div>
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
    userName: state.auth.login

});

const ConnectedApp = connect(mapStateToProps, { addTodoList, getTodoLists, setAuth, login, logout })(App);


export default ConnectedApp;

