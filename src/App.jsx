import { Container, GlobalStyle, Header, AddListButton, MobilePlaceholder } from './App.styles';
import { useState } from 'react';
import { nanoid } from "nanoid";
import Modal from './components/Modal/Modal';
import BoardContainer from './components/BoardContainer';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoLists, setTodoLists] = useState([
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
          "content": ""
        },
        {
          "id": "8oXMRntmvfBk5Q7I8ib9h",
          "text": "2124",
          "content": ""
        }
      ]
    }
  ]);
  const [newListTitle, setNewListTitle] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <GlobalStyle />
      <MobilePlaceholder>
        <p>The site is not available on mobile devices, please try on a device with a resolution of 1024 pixels or more.</p>
      </MobilePlaceholder>
      <Container>
        <Header>
          <h1>Todo List</h1>
        </Header>
        <AddListButton onClick={openModal}>Add List</AddListButton>

        <BoardContainer
          todoLists={todoLists}
          setTodoLists={setTodoLists}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={addNewList}
          newListTitle={newListTitle}
          setNewListTitle={setNewListTitle}
        />
      </Container>
    </>
  );
};

export default App;