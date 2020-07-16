import React from "react";
import {Icon, Modal} from "semantic-ui-react";
import {EditTaskForm} from "../Form/EditTaskForm";
import {ObjType} from "../../types/types";

type PropsType = {
    title: string
    description: string | null
    priority: number
    open: boolean
    startDate: string | null
    deadline: string | null
    onClose: () => void
    editTask: (obj: ObjType) => void
}

export function ModalEditTask (props: PropsType) {
    return (
        <div>
            <Modal open={props.open} >
                <Modal.Header>Edit Task  </Modal.Header>
                <Icon name='close' onClick={props.onClose} />
                <Modal.Content>
                    <EditTaskForm editTask={props.editTask}
                                  title={props.title}
                                  description={props.description}
                                  priority={props.priority}
                                  startDate={props.startDate}
                                  deadline={props.deadline}
                    />
                </Modal.Content>
            </Modal>
        </div>
    )
}
