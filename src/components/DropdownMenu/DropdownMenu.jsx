import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownMenu = (props) => (
    <Dropdown compact text={props.userName}>
        <Dropdown.Menu>
            <Dropdown.Item text='Log out' />
        </Dropdown.Menu>
    </Dropdown>
)

export default DropdownMenu