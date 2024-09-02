import { useState, memo } from "react";
import styled from "styled-components";

import EditIcon from '../icons/EditIcon.svg?react';
import DeleteIcon from '../icons/DeleteIcon.svg?react';
import CompleteIcon from '../icons/CompleteIcon.svg?react';
import UndoIcon from '../icons/UndoIcon.svg?react';
import SaveIcon from '../icons/SaveIcon.svg?react'

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDragging', 'isDragged'].includes(prop),
})`
  background-color: #A78B71;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
  cursor: ${(props) => (props.isDragged ? 'grab' : 'auto')};
  outline: ${(props) => (props.isDragged ? '2px solid #EC9704' : 'none')};

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
`;

const TaskText = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isCompleted'].includes(prop),
})`
  flex-grow: 1;
  text-align: left;
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  
  @media (min-width: 1024px) {
    margin-bottom: 0;
    overflow: visible;
  }
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

const TodoItem = memo(({ task, deleteTask, updateTask, isCompleted, isDragEnabled, hideCompleteButton = false, isDragged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task?.text || '');

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEdit = () => {
    if (isEditing) {
      updateTask(task.id, 'edit', newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <ItemContainer ref={setNodeRef} style={style} isDragging={isDragging} isDragged={isDragged} {...(isDragEnabled && { ...attributes, ...listeners })}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => isEditing && setNewText(e.target.value)}
        />
      ) : (
        <TaskText isCompleted={isCompleted}>{task.text}</TaskText>
      )}
      <ButtonContainer>
        <Button bgcolor="transparent" hovercolor="#d68904" onClick={handleEdit} onPointerDown={(e) => e.stopPropagation()}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </Button>
        <Button bgcolor="transparent" hovercolor="#c82333" onClick={() => deleteTask(task.id, isCompleted)} onPointerDown={(e) => e.stopPropagation()}>
          <DeleteIcon />
        </Button>
        {!isDragEnabled && !hideCompleteButton && (
          < Button
            bgcolor="transparent"
            hovercolor={isCompleted ? "#005f8a" : "#218838"}
            onClick={() => updateTask(task.id, 'toggle')}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {isCompleted ? <UndoIcon /> : <CompleteIcon />}
          </Button>
        )}
      </ButtonContainer>
    </ItemContainer >
  );
});

export default TodoItem;