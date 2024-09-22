import { Container, GlobalStyle, Header, AddListButton, MobilePlaceholder, TitleContainer, ToggleContainer } from './App.styles';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import Modal from './components/Modal/Modal';
import BoardContainer from './components/BoardContainer';
import ToggleTheme from './components/ToggleTheme';
import { defaultTheme, darkTheme } from './components/Themes'
import { Route, Routes } from 'react-router-dom';
import TaskPage from './components/TaskPage/TaskPage';
import ModalAddTask from './components/Modal/ModalAddTask';

const LOCAL_STORAGE_KEY = 'todoLists';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? darkTheme : defaultTheme;
  });
  const [newListTitle, setNewListTitle] = useState("");
  const [todoLists, setTodoLists] = useState(() => {
    const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedLists ? JSON.parse(savedLists) : [
      {
        "id": "1LfHP7_xlKLPtQ1i-n8mk",
        "title": "123",
        "tasks": [
          {
            "id": "9R0D-ocBhMPgKGEJl1zk-",
            "text": "124124",
            "content": ""
          }
        ]
      },
      {
        "id": "f9M6Qz5aFbvUwNS5C79uQ",
        "title": "1241245",
        "tasks": [
          {
            "id": "lOTbSiAimLul2Xqvm3e3J",
            "text": "21321",
            "content": "11111111111"
          },
          {
            "id": "8oXMRntmvfBk5Q7I8ib9h",
            "text": "2124",
            "content": ""
          }
        ]
      }
    ];
  });

  const [selectedTask, setSelectedTask] = useState(null);

  const toggleTheme = () => {
    const newTheme = theme === defaultTheme ? darkTheme : defaultTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoLists));
  }, [todoLists]);

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const openModal = () => { setIsModalOpen(true) };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewListTitle("");
  };

  const addNewList = (title) => {
    if (title.trim() === "") return;
    const newList = {
      id: nanoid(),
      title: title,
      tasks: [],
    };

    setTodoLists((prevLists) => [...prevLists, newList]);
    setNewListTitle("");
    closeModal();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MobilePlaceholder>
          <p>The site is not available on mobile devices, please try on a device with a resolution of 1024 pixels or more.</p>
        </MobilePlaceholder>
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <Header>
                  <TitleContainer>
                    <h1>Todo List</h1>
                  </TitleContainer>
                  <ToggleContainer>
                    <ToggleTheme toggleTheme={toggleTheme} />
                  </ToggleContainer>
                </Header>
                <AddListButton onClick={openModal}>Add List</AddListButton>

                <BoardContainer
                  todoLists={todoLists}
                  setTodoLists={setTodoLists}
                  openModal={openTaskModal}
                />
                <ModalAddTask
                  isOpen={isTaskModalOpen}
                  onClose={closeTaskModal}
                  task={selectedTask}
                  isEditMode={!!selectedTask}
                />
              </Container>
            }
          />
          <Route
            path="/task/:id"
            element={<TaskPage theme={theme} />
            }
          />
        </Routes>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={addNewList}
          newListTitle={newListTitle}
          setNewListTitle={setNewListTitle}
        />
      </ThemeProvider>
    </>
  );
};

export default App;