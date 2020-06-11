import React from 'react'
import {Button, Icon, Popup} from 'semantic-ui-react'


class PopupButtons extends React.Component {
    state = {isOpen: false};

    handleOpen = () => {
        this.setState({isOpen: true});
    };

    handleClose = () => {
        this.setState({isOpen: false});
        clearTimeout(this.timeout)
    };

    render() {
        return (
            <Popup
                trigger={
                    <Icon color="red" name={"trash alternate outline"}/>
                }
                header="Are you sure?"
                content={
                    <Button.Group size="mini">
                        <Button onClick={this.handleClose} color="red" icon="close"/>
                        <Button onClick={this.props.onDeleteTask} color="green" icon="check"/>
                    </Button.Group>
                }
                on="click"
                position='top center'
                size="mini"
                open={this.state.isOpen}
                onOpen={this.handleOpen}
                inverted
            />
        )

    }
}

export default PopupButtons