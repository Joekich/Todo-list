import { ModalOverlay, ModalHeader, ModalBody, ModalFooter, CloseButton, ModalButton, Input, ModalTitle, ModalContainer } from "./Modal.Styles";

const Modal = ({ isOpen, onClose, onSubmit, newListTitle, setNewListTitle, isEditMode }) => {

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return isOpen ? (
        <ModalOverlay onClick={handleClickOutside}>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>{isEditMode ? "Edit Todo List Name" : "Create New Todo List"}</ModalTitle>
                    <CloseButton onClick={onClose}></CloseButton>
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        placeholder="Enter list name"
                    />
                </ModalBody>
                <ModalFooter>
                    <ModalButton primary onClick={() => onSubmit(newListTitle)}>
                        {isEditMode ? "Change List Name" : "Add"}
                    </ModalButton>
                    <ModalButton onClick={onClose}>Cancel</ModalButton>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    ) : null;
};

export default Modal;