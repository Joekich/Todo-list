import { useState } from "react";
import styled from "styled-components";
import EditIcon from '../icons/EditIcon.svg?react';
import DeleteIcon from '../icons/DeleteIcon.svg?react';
import CompleteIcon from '../icons/CompleteIcon.svg?react';
import UndoIcon from '../icons/UndoIcon.svg?react';
import SaveIcon from '../icons/SaveIcon.svg?react'

const ItemContainer = styled.div`
  background-color: #A78B71;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 90%;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TaskText = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isCompleted'].includes(prop),
})`
  flex-grow: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    overflow: visible;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: nowrap;
  }

  & > button {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    width: calc(33.33% - 0.5rem);

    @media (min-width: 768px) {
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

const TodoItem = ({ task, deleteTask, updateTask, isCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      updateTask(task.id, 'edit', newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <ItemContainer>
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
        <Button bgcolor="transparent" hovercolor="#d68904" onClick={handleEdit}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </Button>
        <Button bgcolor="transparent" hovercolor="#c82333" onClick={() => deleteTask(task.id, isCompleted)}>
          <DeleteIcon />
        </Button>
        <Button
          bgcolor="transparent"
          hovercolor={isCompleted ? "#005f8a" : "#218838"}
          onClick={() => updateTask(task.id, 'toggle')}
        >
          {isCompleted ? <UndoIcon /> : <CompleteIcon />}
        </Button>
      </ButtonContainer>
    </ItemContainer>
  );
};

export default TodoItem;