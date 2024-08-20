import { Container, GlobalStyle, Header } from './App.styles';
import { Todo } from './components/Todo';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>Todo List</h1>
        </Header>
        <Todo />
      </Container>
    </>
  );
};

export default App;