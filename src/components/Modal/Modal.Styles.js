import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.modalOverlayBg};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.modalContainerBg};
  width: 400px;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.modalTitleColor};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.modalCloseButtonColor};
`;

export const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['primary'].includes(prop),
})`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ theme, primary }) => (primary ? theme.modalButtonPrimaryBg : theme.modalButtonSecondaryBg)};
  color: ${(props) => props.primary ? props.theme.modalButtonPrimaryText : props.theme.modalButtonSecondaryText};

  &:hover {
    opacity: 0.9;
    background-color: ${({ theme, primary }) => (primary ? theme.modalButtonPrimaryHoverBg : theme.modalButtonSecondaryHoverBg)};
  }
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
  resize: vertical;
  margin-bottom: 1rem;
`;