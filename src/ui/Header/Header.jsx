import React from "react"
import MyAccount from "../../components/MyAccount/MyAccount";
import style from './Header.module.css'
import headerLogo from '../../assets/img/unnamed.png'

const Header = (props) => {
    return (
        <>
            <img className={style.headerLogo} src={headerLogo} alt=""/>
            <h1 className={style.headerTitle}>TODO APP</h1>
            <MyAccount logout={props.logout} userName={props.userName}/>
        </>
    )
}

export default Header