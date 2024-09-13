import { useState, useEffect } from 'react';
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
    Input,
    ModalFooter,
    ModalButton,
    ModalTextArea
} from "./Modal.Styles"

const ModalAddTask = ({ isOpen, onClose, onAddTask, task, isEditMode }) => {
    const [taskName, setTaskName] = useState('');
    const [taskContent, setTaskContent] = useState('');

    useEffect(() => {
        if (isOpen && isEditMode && task) {
            setTaskName(task.text || '');
            setTaskContent(task.content || '');
        } else if (isOpen && !isEditMode) {
            setTaskName('');
            setTaskContent('');
        }
    }, [isOpen, isEditMode, task]);

    const handleSave = () => {
        if (isEditMode) {
            onAddTask(task.id, taskName, taskContent);
        } else {
            onAddTask(taskName, taskContent);
        }
        handleClose();
    };

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setTaskName("");
        setTaskContent("");
        onClose();
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>{isEditMode ? "Edit Task" : "Add Task"}</ModalTitle>
                    <CloseButton onClick={handleClose}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <ModalTextArea
                        placeholder="Task Content (Optional)"
                        value={taskContent}
                        onChange={(e) => setTaskContent(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={handleSave}>{isEditMode ? "Save Changes" : "Add Task"}</ModalButton>
                    <ModalButton onClick={handleClose}>Cancel</ModalButton>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ModalAddTask;