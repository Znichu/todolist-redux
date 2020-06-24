import React from "react"
import {Dropdown, Image} from "semantic-ui-react";
import logo from '../../assets/img/logo.png'


const MyAccount = () => {

    const trigger = (
        <span>
            <Image avatar src={logo}/> User
        </span>
    )

    const onClickTrigger = () => {
        alert("Hello");
    };

    const options = [
        {key: 'user', text: 'Account', icon: 'user', onClick: onClickTrigger},
        {key: 'settings', text: 'Settings', icon: 'settings'},
        {key: 'sign-out', text: 'Sign Out', icon: 'sign out'},
    ]

    return (
        <Dropdown
            trigger={trigger}
            options={options}
            pointing='top right'
            icon={null}
        />
    )
}

export default MyAccount