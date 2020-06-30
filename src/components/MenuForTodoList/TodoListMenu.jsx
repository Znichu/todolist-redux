import React from 'react'
import {Dropdown, Icon} from 'semantic-ui-react'

const TodoListMenu = (props) => {

    const onAllFilter = () => { props.changeFilterValue("All") };
    const onCompletedFilter = () => { props.changeFilterValue("Completed") };
    const onActiveFilter = () => { props.changeFilterValue("Active") };
    const dIcon = <Icon name='bars' color='grey'/>

    return (
        <Dropdown
            icon={dIcon}
            floating
            labeled

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