import React, {useState} from 'react'
import {Dropdown, Icon} from 'semantic-ui-react'
import style from './TodoListMenu.module.css'

const TodoListMenu = (props) => {

    let [rotated, setRotated] = useState(false);

    const onAllFilter = () => { props.changeFilterValue("All") };
    const onCompletedFilter = () => { props.changeFilterValue("Completed") };
    const onActiveFilter = () => { props.changeFilterValue("Active") };
    const changeRotated = !rotated ? 'bars' : 'clockwise rotated bars';

    return (
        <Dropdown
            icon={<Icon name={ changeRotated } color='orange' className={style.todoListMenuIcon}/>}
            floating
            labeled
            onClick={ () => setRotated(true) }
            onBlur={ () => setRotated(false) }

        >
            <Dropdown.Menu>
                <Dropdown.Header icon='filter' content='Filter task' />
                <Dropdown.Divider />
                <Dropdown.Item
                    label={{ color: 'blue', empty: true, circular: true }}
                    text='All'
                    onClick={onAllFilter}
                />
                <Dropdown.Item
                    label={{ color: 'green', empty: true, circular: true }}
                    text='Completed'
                    onClick={onCompletedFilter}
                />
                <Dropdown.Item
                    label={{ color: 'yellow', empty: true, circular: true }}
                    text='Active'
                    onClick={onActiveFilter}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                    icon='trash'
                    text='Delete Todo List'
                    onClick={props.deleteTodoList}
                />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default TodoListMenu