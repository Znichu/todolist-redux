import React from 'react'
import {Dropdown} from 'semantic-ui-react'
import style from './TaskMenu.module.css'



const TaskMenu = (props) => {

    const edit = [
        { key: 'edit', value: 'edit', icon: 'edit', text: 'Edit Task', onClick: props.activateEditMode },
        { key: 'delete', value: 'delete', icon: 'delete', text: 'Remove Task', onClick: props.onDeleteTask }
    ]
    const priority = [
        {
            key: 'low',
            text: 'low',
            value: 0,
            label: { color: 'green', empty: true, circular: true },
        },
        {
            key: 'middle',
            text: 'middle',
            value: 1,
            label: { color: 'yellow', empty: true, circular: true },
        },
        {
            key: 'high',
            text: 'high',
            value: 2,
            label: { color: 'orange', empty: true, circular: true },
        },
        {
            key: 'urgently',
            text: 'urgently',
            value: 3,
            label: { color: 'red', empty: true, circular: true },
        },
        {
            key: 'later',
            text: 'later',
            value: 4,
            label: { color: 'blue', empty: true, circular: true },
        }
    ]

    return (

        <Dropdown className={style.taskMenu} multiple icon='ellipsis vertical' floating trigger={<React.Fragment />}>
            <Dropdown.Menu>
                {edit.map(option =>
                    <Dropdown.Item key={option.value} {...option} />
                )}
                <Dropdown.Header icon='bookmark' content='Priority' />
                <Dropdown.Divider />
                {priority.map(option =>
                    <Dropdown.Item key={option.value} {...option} onClick={ () => props.onChange(option.value) } />
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}


export default TaskMenu