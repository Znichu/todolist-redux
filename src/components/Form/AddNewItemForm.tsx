import React, {ChangeEvent} from 'react';
import '../../App.css';
import {Icon, Input} from "semantic-ui-react";

type State = {
    error: boolean
    title: string
}

type Props = {
    size: "big" | "small" | "mini" | "large" | "huge" | "massive" | undefined
    autoFocus: boolean
    onBlur: () => void
    addItem: (text : string) => void
    deactivateEditMode: () => void
}

class AddNewItemForm extends React.Component<Props, State> {
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

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };


    render = () => {
        const inputIcon = <Icon inverted color='grey' rotated='clockwise' name='level down alternate' />;

        return (
                <Input fluid size={this.props.size}
                       placeholder="New item name"
                       value={this.state.title}
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       error={this.state.error}
                       autoFocus={this.props.autoFocus}
                       onBlur={this.props.onBlur}
                       icon={inputIcon}
                />
        );
    }
}

export default AddNewItemForm;

