import React from "react"
import {Modal} from "semantic-ui-react";
import LoginForm from "./LoginForm";


class Login extends React.Component {
    state = {modalOpen: true};

    handleClose = () => this.setState({modalOpen: false});

    render() {
        return (
            <Modal open={this.state.modalOpen}  basic>
                <LoginForm onClose={this.handleClose} login={this.props.login}/>
            </Modal>
        )
    }
}

export default Login;