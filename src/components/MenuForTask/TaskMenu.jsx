import React from 'react'
import {Dropdown, Input} from 'semantic-ui-react'
import style from './TaskMenu.module.css'



const TaskMenu = (props) => {

    const options = [
        { key: 'edit', icon: 'edit', text: 'Edit Task', onClick: props.activateEditMode },
        { key: 'delete', icon: 'delete', text: 'Remove Task', onClick: props.onDeleteTask }
    ]

    return (
        <Dropdown
            className={style.taskMenu}
            multiple icon='ellipsis vertical'
            floating
            options={options}
            trigger={<React.Fragment />}
        />

    )
}


export default TaskMenu