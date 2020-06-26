import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const TodoListMenu = (props) => {

    const onAllFilter = () => { props.changeFilterValue("All") };
    const onCompletedFilter = () => { props.changeFilterValue("Completed") };
    const onActiveFilter = () => { props.changeFilterValue("Active") };

    return (
        <Dropdown
            icon='bars'
            floating
            labeled
            className='icon'
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