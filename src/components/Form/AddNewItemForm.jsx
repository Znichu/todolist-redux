import React from 'react';
import '../../App.css';
import {Icon, Input} from "semantic-ui-react";

class AddNewItemForm extends React.Component {
    state = {
        error: false,
        title: ""
    };

    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ""});

        if (newText === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            // передаём новый текст наружу
            this.props.addItem(newText);
            this.props.deactivateEditMode();
        }
    };

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };


    render = () => {
        let classNameForInput = this.state.error ? "error" : null;
        const inputIcon = <Icon inverted color='grey' rotated='clockwise' name='level down alternate' />;

        return (
                <Input fluid size={this.props.size}
                       placeholder="New item name"
                       value={this.state.title}
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       className={classNameForInput}
                       autoFocus={this.props.autoFocus}
                       onBlur={this.props.onBlur}
                       icon={inputIcon}
                />
        );
    }
}

export default AddNewItemForm;

