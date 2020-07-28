import React from "react";
import {Dimmer, Loader} from "semantic-ui-react";

export function Preloader() {
    return (
        <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
        </Dimmer>
    )
}