import { Container, GlobalStyle, Header, TaskCounterContainer } from './App.styles';
import { Todo } from './components/Todo';
import { useState } from 'react';

const App = () => {
  const [taskCounter, setTaskCounter] = useState({
    count: "0/0",
    color: '#0077b6',
    show: false
  });

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>Todo List</h1>
          {taskCounter.show && (
            <TaskCounterContainer>
              <span>tasks completed: </span>
              <div style={{ color: taskCounter.color }}>{taskCounter.count}</div>
            </TaskCounterContainer>
          )}
        </Header>
        <Todo setTaskCounter={setTaskCounter} />
      </Container>
    </>
  );
};

export default App;