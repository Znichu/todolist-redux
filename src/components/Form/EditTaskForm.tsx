import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Dropdown, Input as SemanticInput, TextArea} from "semantic-ui-react";
import style from './EditTaskForm.module.css'
import {ObjType} from "../../types/types";
import {formatDate} from "../../utils/FormateDate";

type IFormInput = {
    title: string
    description: string |undefined
    priority: number
    startDate: string | undefined
}
type PropsType = {
    title: string
    description: string | null
    priority: number
    startDate: string | null
    editTask: (data: ObjType) => void
}


export function EditTaskForm(props: PropsType) {
    const {handleSubmit, control, errors} = useForm();
    const onSubmit = (data: IFormInput) => {
        console.log(data);
        props.editTask(data);
    }
    const priority = [
        {key: 'low', text: 'low', value: 0, label: { color: 'green', empty: true, circular: true }},
        {key: 'middle', text: 'middle', value: 1, label: { color: 'yellow', empty: true, circular: true }},
        {key: 'high', text: 'high', value: 2, label: { color: 'orange', empty: true, circular: true }},
        {key: 'urgently', text: 'urgently', value: 3, label: { color: 'red', empty: true, circular: true }},
        {key: 'later', text: 'later', value: 4, label: { color: 'blue', empty: true, circular: true }}
    ]
    let startDate = formatDate(props.startDate);

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
                <div className="field">
                    <label>Start Date</label>
                    <Controller
                        as={SemanticInput}
                        name="startDate"
                        control={control}
                        defaultValue={startDate}
                        type="datetime-local"
                    />
                </div>
                <Button color='blue' type='submit'>Save</Button>
            </div>
        </form>
    );
}
