import styled from "styled-components";

export const ListContainer = styled.article.withConfig({
  shouldForwardProp: (prop) => !['isOverlay', 'isDragging'].includes(prop),
})`
    border: solid 1px ${({ theme }) => theme.listContainerBorder};
    border-radius: 10px;
    margin-bottom: 1rem;
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    height: auto;
    width: 365px;
    flex-shrink: 0;
    height: 600px;
    background-color: ${({ isOverlay, theme }) => (isOverlay ? theme.listContainerOverlay : theme.listContainer)};
    outline: ${({ isOverlay, theme }) => (isOverlay ? `2px solid ${theme.itemContainerBorderOverlay}` : 'none')};
    opacity: ${({ isDragging }) => (isDragging ? '0.5' : '1')};
    overflow: visible;
  
    @media (max-width: 1023px) {
      width: 100%;
      padding: 8px;
      height: auto;
    }
  `;

export const TitleContainer = styled.div`
    border-bottom: solid 1px ${({ theme }) => theme.titleBorderColor};
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    z-index: 2;
  `;

export const Title = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.title};
    margin: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1 rem;
    position: relative;
  `;

export const TasksContainer = styled.div`
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    z-index: 1;
  
    @media (min-width: 1023px) {
      margin-bottom: 0;
  
      &::-webkit-scrollbar {
        width: 12px;
        background-color: ${({ theme }) => theme.scrollbarBackground};
      }
  
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: ${({ theme }) => theme.scrollbarThumb};
        border: 3px solid ${({ theme }) => theme.scrollbarBorder};
      }
  
      &:hover {
        &::-webkit-scrollbar-thumb {
          background-color: ${({ theme }) => theme.scrollbarThumb};
          border: 3px solid ${({ theme }) => theme.scrollbarBorder};
        }
      }
  
      &::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.scrollbarThumbHover};
      }
  
      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.scrollbarTrack};
        border-radius: 10px;
      }
    }
  `;

export const DragButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isDragging', 'isOverlay'].includes(prop),
})`
    background-color: ${({ theme }) => theme.dragButton};
    border: none;
    font-size: 1.2rem;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.dragButtonHover};
    height: 31px;
    width: 55px;
  
    cursor: ${({ isOverlay }) => (isOverlay ? 'grabbing' : 'grab')};
  
    &:hover {
      background-color: ${({ theme }) => theme.dragButtonHover};
    }
  
    @media (max-width: 389px) {
      height: 46px;
    }
  `;

export const DeleteButton = styled.button`
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  
    &:hover {
      background-color: #ff4949;
    }
  
    @media (max-width: 389px) {
      height: 46px;
    }
  `;
export const EditButton = styled.button`
    background-color: ${({ theme }) => theme.editButton};
    color: ${({ theme }) => theme.color};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 0.5rem;
  
    &:hover {
      background-color: ${({ theme }) => theme.editButtonHover};
    }
  
    @media (max-width: 389px) {
      height: 46px;
    }
  `;

export const AddTaskButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.addTaskButton};
    color: ${({ theme }) => theme.color};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    opacity: 0.7;
    z-index: 1;
  
    &:hover {
      opacity: 1;
      outline: 3px solid ${({ theme }) => theme.addTaskButtonHover};
    }
  `;

export const MenuButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  
  `;

export const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})`
    position: absolute;
    top: 100%;
    left: -70%;
    background-color: ${({ theme }) => theme.dropdownMenuBg};
    border: 1px solid ${({ theme }) => theme.dropdownMenuBorder};
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 9999;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    margin-top: 8px;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0s linear ${({ isOpen }) => (isOpen ? '0s' : '0.5s')};
  `;