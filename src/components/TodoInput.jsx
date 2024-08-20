import { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border: 1px solid #A78B71;
  border-radius: 4px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 1rem;
    flex-grow: 1;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #EC9704;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #9C4A1A;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

const TodoInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task) {
      addTask(task.trim());
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <Button type="submit">Add</Button>
      </InputContainer>
    </form>
  );
};

export default TodoInput;