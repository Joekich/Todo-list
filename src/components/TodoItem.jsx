import { useState } from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  background-color: #A78B71;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

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
        <Button bgcolor="#EC9704" hovercolor="#d68904" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button bgcolor="#dc3545" hovercolor="#c82333" onClick={() => deleteTask(task.id, isCompleted)}>
          Delete
        </Button>
        <Button
          bgcolor={isCompleted ? "#0077b6" : "#0d730b"}
          hovercolor={isCompleted ? "#005f8a" : "#218838"}
          onClick={() => updateTask(task.id, 'toggle')}
        >
          {isCompleted ? "Undo" : "Complete"}
        </Button>
      </ButtonContainer>
    </ItemContainer>
  );
};

export default TodoItem;