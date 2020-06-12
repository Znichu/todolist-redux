import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const friendOptions = [
    {
        key: 'low',
        text: 'low',
        value: 0,
    },
    {
        key: 'middle',
        text: 'middle',
        value: 1,
    },
    {
        key: 'high',
        text: 'high',
        value: 2,
    },
    {
        key: 'urgently',
        text: 'urgently',
        value: 3,
    },
    {
        key: 'later',
        text: 'later',
        value: 4,
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