import React from "react"
import {Dropdown, Image} from "semantic-ui-react";
import style from './MyAccount.module.css'

const MyAccount = (props) => {

    const trigger = (
        <span>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/> {props.userName}
        </span>
    )

    const options = [
        {key: 'user', text: 'Account', icon: 'user'},
        {key: 'settings', text: 'Settings', icon: 'settings'},
        {key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: props.logout},
    ]

    return (
        <Dropdown
            className={style.myAccount}
            trigger={trigger}
            options={options}
            pointing='top right'
            icon={null}
        />
    )
}

export default MyAccount