import styled from "styled-components";
import TodoItem from "./TodoItem";
import Modal from "./Modal/Modal";
import ModalAddTask from "./Modal/ModalAddTask";
import AddTaskIcon from '../icons/AddTaskIcon.svg?react';
import TodoListMenuIcon from '../icons/TodoListMenuIcon.svg?react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

const ListContainer = styled.article.withConfig({
  shouldForwardProp: (prop) => !['isOverlay', 'isDragging'].includes(prop),
})`
  border: solid 1px #A78B71;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  height: auto;
  width: 365px;
  flex-shrink: 0;
  height: 600px;
  background-color: ${({ isOverlay }) => (isOverlay ? '#ebd8c7' : '#ffebd9')};
  outline: ${({ isOverlay }) => (isOverlay ? '#d68904 2px solid' : 'none')};
  opacity: ${({ isDragging }) => (isDragging ? '0.5' : '1')};
  overflow: visible;

  @media (max-width: 1023px) {
    width: 100%;
    padding: 8px;
    height: auto;
  }
`;

const TitleContainer = styled.div`
  border-bottom: solid 1px #A78B71;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #583E26;
  margin: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1 rem;
  position: relative;
`;

const TasksContainer = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  z-index: 1;

  @media (min-width: 1023px) {
    margin-bottom: 0;

    &::-webkit-scrollbar {
      width: 12px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 6px;
      border: 3px solid transparent;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #A78B71;
        border: 3px solid #ffebd9;
      }
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #8b6a4f;
    }

    &::-webkit-scrollbar-track {
      background-color: #ffebd9;
      border-radius: 10px;
    }
  }
`;

const DragButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isDragging', 'isOverlay'].includes(prop),
})`
  background-color: #A78B71;
  border: none;
  font-size: 1.2rem;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #896550;
  height: 31px;
  width: 55px;

  cursor: ${({ isOverlay }) => (isOverlay ? 'grabbing' : 'grab')};

  &:hover {
    background-color: #896550;
  }

  @media (max-width: 389px) {
    height: 46px;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #ff4949;
  }

  @media (max-width: 389px) {
    height: 46px;
  }
`;
const EditButton = styled.button`
  background-color: #A78B71;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #896550;
  }

  @media (max-width: 389px) {
    height: 46px;
  }
`;

const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  opacity: 0.7;
  z-index: 1;

  &:hover {
    opacity: 1;
    outline: 3px solid #45a049;
  }
`;

const MenuButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);

`;

const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})`
  position: absolute;
  top: 100%;
  left: -70%;
  background-color: #fff;
  border: 1px solid #A78B71;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 9999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  margin-top: 8px;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0s linear ${({ isOpen }) => (isOpen ? '0s' : '0.5s')};
`;

const TodoList = ({ id, tasks, title, isDragging, isOverlay, setTodoLists }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newListTitle, setNewListTitle] = useState(title);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list and all tasks?')) {
      setTodoLists((prevLists) => prevLists.filter(list => list.id !== id));
    }
  };

  const handleEditListName = () => {
    setIsEditMode(true);
    setNewListTitle(title);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleModalSubmit = () => {
    if (isEditMode) {
      setTodoLists((prevLists) =>
        prevLists.map((list) =>
          list.id === id ? { ...list, title: newListTitle } : list
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleAddTaskSubmit = (taskName, taskContent) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? {
            ...list,
            tasks: [...list.tasks, { id: nanoid(), text: taskName, content: taskContent }],
          }
          : list
      )
    );
    setIsAddTaskModalOpen(false);
  };

  const handleEditTaskSubmit = (taskId, taskName, taskContent) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId
                ? { ...task, text: taskName, content: taskContent }
                : task
            ),
          }
          : list
      )
    );
    setIsEditTaskModalOpen(false);
  };

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsEditTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) } : list
      )
    );
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <ListContainer ref={setNodeRef} style={style} isDragging={isDragging} isOverlay={isOverlay}>
      <TitleContainer>
        <Title>{title}</Title>
        <ButtonContainer>
          <MenuButton ref={buttonRef} onClick={toggleMenu} isOpen={isMenuOpen}>
            <TodoListMenuIcon />
          </MenuButton>
          <DropdownMenu ref={menuRef} isOpen={isMenuOpen}>
            <EditButton onClick={handleEditListName}>Edit</EditButton>
            <DeleteButton onClick={handleDeleteList}>Delete</DeleteButton>
          </DropdownMenu>
          <DragButton isOverlay={isOverlay} {...attributes} {...listeners}>:::</DragButton>
        </ButtonContainer>
      </TitleContainer>
      <TasksContainer>
        <AddTaskButton onClick={() => setIsAddTaskModalOpen(true)}>
          <AddTaskIcon />
        </AddTaskButton>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            task={task}
            deleteTask={handleDeleteTask}
            openEditModal={handleOpenEditModal}
          />
        ))}
      </TasksContainer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        newListTitle={newListTitle}
        setNewListTitle={setNewListTitle}
        isEditMode={isEditMode}
      />
      <ModalAddTask
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTaskSubmit}
        isEditMode={false}
      />
      <ModalAddTask
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        onAddTask={handleEditTaskSubmit}
        task={selectedTask}
        isEditMode={true}
      />
    </ListContainer>
  );
};

export default TodoList;