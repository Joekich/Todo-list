import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #F5EDED;
    color: #333;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
`;

const Header = styled.header`
  background-color: #A78B71;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { text: task, isCompleted: false }]);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const activeTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>Todo List</h1>
        </Header>
        <TodoInput addTask={addTask} />
        <TodoList
          title="Active Tasks"
          tasks={activeTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
        <TodoList
          title="Completed Tasks"
          tasks={completedTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          isCompleted={true}
        />
      </Container>
    </>
  );
};

export default App;