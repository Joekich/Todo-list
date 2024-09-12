import styled from "styled-components";

import EditIcon from '../icons/EditIcon.svg?react';
import DeleteIcon from '../icons/DeleteIcon.svg?react';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";

const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDragging', 'isOverlay'].includes(prop),
})`
  background-color: #A78B71;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  outline: ${({ isOverlay }) => (isOverlay ? '2px solid #d68904' : 'none')};

`;

const TaskText = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isCompleted'].includes(prop),
})`
  text-align: left;
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: 250px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: nowrap;
    pointer-events: auto;
  }

  & > button {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    width: calc(33.33% - 0.5rem);

    @media (min-width: 1024px) {
      margin-top: 0;
      margin-left: 0.5rem;
      width: auto;
    }
  }
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['bgcolor', 'hovercolor'].includes(prop),
})`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.bgcolor || "#EC9704"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hovercolor || "#9C4A1A"};
  }
`;

const TodoItem = memo(({ task, deleteTask, openEditModal, isOverlay }) => {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ItemContainer ref={setNodeRef} style={style} isDragging={isDragging} isOverlay={isOverlay} {...attributes} {...listeners}>
      <TaskText>{task.text}</TaskText>
      <ButtonContainer>
        <Button bgcolor="transparent" hovercolor="#d68904" onClick={() => openEditModal(task)} onPointerDown={(e) => e.stopPropagation()} disabled={isOverlay}>
          <EditIcon />
        </Button>
        <Button bgcolor="transparent" hovercolor="#c82333" onClick={() => deleteTask(task.id)} onPointerDown={(e) => e.stopPropagation()} disabled={isOverlay}>
          <DeleteIcon />
        </Button>
      </ButtonContainer>
    </ItemContainer >
  );
});

export default TodoItem;