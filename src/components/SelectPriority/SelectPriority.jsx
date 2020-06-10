import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const friendOptions = [
    {
        key: 'low',
        text: 'low',
        value: 'low',
    },
    {
        key: 'middle',
        text: 'middle',
        value: 'middle',
    },
    {
        key: 'high',
        text: 'high',
        value: 'high',
    },
];

const SelectPriority = (props) => (
    <span>
    Priority{' '}
        <Dropdown
            inline
            options={friendOptions}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
        />
  </span>
);

export default SelectPriority;