import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Dropdown, Input as SemanticInput, TextArea} from "semantic-ui-react";
import style from './EditTaskForm.module.css'
import {ObjType} from "../../types/types";

type IFormInput = {
    title: string
    description: string |undefined
    priority: number
}
type PropsType = {
    title: string
    description: string | null
    priority: number
    editTask: (data: ObjType) => void
}


export function EditTaskForm(props: PropsType) {
    const {handleSubmit, register, reset, control, errors} = useForm();
    const onSubmit = (data: IFormInput) => props.editTask(data);
    const priority = [
        {key: 'low', text: 'low', value: 0, label: { color: 'green', empty: true, circular: true }},
        {key: 'middle', text: 'middle', value: 1, label: { color: 'yellow', empty: true, circular: true }},
        {key: 'high', text: 'high', value: 2, label: { color: 'orange', empty: true, circular: true }},
        {key: 'urgently', text: 'urgently', value: 3, label: { color: 'red', empty: true, circular: true }},
        {key: 'later', text: 'later', value: 4, label: { color: 'blue', empty: true, circular: true }}
    ]

    return (
        <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
            <div className={style.editForm}>
                <div className="field">
                    <label>Title</label>
                    <Controller
                        as={SemanticInput}
                        name="title"
                        control={control}
                        defaultValue={props.title}
                    />
                </div>
                <div className="field">
                    <label>Description</label>
                <Controller
                    as={TextArea}
                    placeholder='Choose an option'
                    name="description"
                    control={control}
                    defaultValue={props.description}
                />
                </div>
                <div className="field">
                    <label>Priority</label>
                <Controller
                    name="priority"
                    control={control}
                    defaultValue={props.priority}
                    placeholder='Choose an option'
                    render={props => (
                        <Dropdown {...props} selection options={priority} onChange={(e, {value}) => {
                            props.onChange(value);
                        }}
                        />
                    )}
                />
                </div>
                <Button type='submit'>Submit</Button>
            </div>
        </form>
    );
}
