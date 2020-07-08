import React from 'react';
import './App.css';
import TodoList from "./ui/TodoList";
import AddNewItemForm from "./components/Form/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoLists} from "./redux/todo-reducer";
import {initialized, login, logout, setAuth} from "./redux/app-reducer";
import LoginForm from "./components/Form/LoginForm";
import {Segment} from "semantic-ui-react";
import Header from "./ui/Header/Header";
import {RootAppState} from "./redux/store";
import {TodoListType} from "./types/types";


type MapStateProps = {
    todoLists: Array<TodoListType>
    isAuth: boolean
    userName: string | null
    initialized: boolean
    isFetching: boolean
}

type State = {
    editMode: boolean
}

type MapDispatchProps = {
    addTodoList: (title: string) => void
    getTodoLists: () => void
    initialized: () => void
    setAuth: () => void
    login: (email: string, password: string, rememberMe: boolean) => void
    logout: () => void
}

type Props = MapStateProps & MapDispatchProps

class App extends React.Component<Props, State> {

    state: State = {
        editMode: false
    };

    componentDidMount() {
        this.props.initialized();
        this.props.getTodoLists();
    }

    addTodoList = (title: string) => {
        this.props.addTodoList(title);
    };
    activateEditMode = () => {
        this.setState({editMode: true})
    };
    deactivateEditMode = () => {
        this.setState({editMode: false})
    };


    render = () => {
        const todoLists = this.props.todoLists.map(tl => <TodoList key={tl.id}
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
                    <Header logout={this.props.logout} userName={this.props.userName}/>
                </div>
                <div className="containerList">
                    {todoLists}
                    <div className="containerAddTodo">
                        {!this.state.editMode
                            ?
/*                            <Segment
                                onClick={this.activateEditMode}>
                                Add Todo List
                            </Segment>*/
                            <div onClick={this.activateEditMode} className="addTodoList">
                                <span>Add todo list</span>
                            </div>
                            : <AddNewItemForm
                                autoFocus={true}
                                onBlur={this.deactivateEditMode}
                                deactivateEditMode={this.deactivateEditMode}
                                size={"small"}
                                addItem={this.addTodoList}
                            />
                        }
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: RootAppState): MapStateProps => ({
    todoLists: state.app.todoLists,
    isAuth: state.auth.isAuth,
    userName: state.auth.login,
    initialized: state.auth.initialized,
    isFetching: state.app.isFetching

});

const ConnectedApp = connect<MapStateProps, MapDispatchProps, {}, RootAppState>(mapStateToProps, {
    addTodoList,
    getTodoLists,
    initialized,
    setAuth,
    login,
    logout
})(App);


export default ConnectedApp;

