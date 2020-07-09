import React from "react"
import MyAccount from "../../components/MyAccount/MyAccount";
import style from './Header.module.css'

type Props = {
    userName: string | null
    logout: () => void
}

const Header: React.FC<Props> = (props: Props) => {
    return (
        <>
            <h1 className={style.headerTitle}>TODO</h1>
            <MyAccount logout={props.logout} userName={props.userName}/>
        </>
    )
}

export default Header