import React from 'react'
import { Image } from 'semantic-ui-react'
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const Avatar = (props) => (
    <div>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' avatar />
        <DropdownMenu userName={props.userName} />
    </div>
);

export default Avatar