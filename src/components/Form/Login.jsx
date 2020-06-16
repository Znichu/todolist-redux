import React from "react"
import {Button, Icon, Modal} from "semantic-ui-react";
import LoginForm from "./LoginForm";




class Login extends React.Component {
    state = { modalOpen: true };

    handleClose = () => this.setState({ modalOpen: false });

    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
            >
<LoginForm login={this.props.login} />
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default Login;