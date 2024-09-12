import styled from "styled-components";
import TodoItem from "./TodoItem";
import Modal from "./Modal/Modal";
import ModalAddTask from "./Modal/ModalAddTask";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { useState, memo } from "react";
import { nanoid } from "nanoid";

const ListContainer = styled.div.withConfig({
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
  height: 410px;
  background-color: ${({ isOverlay }) => (isOverlay ? '#ebd8c7' : '#ffebd9')};
  outline: ${({ isOverlay }) => (isOverlay ? '#d4bba5 2px solid' : 'none')};
  opacity: ${({ isDragging }) => (isDragging ? '0.5' : '1')};

  @media (max-width: 1024px) {
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
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
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
  margin-top: 0.5rem;
  justify-content: space-between;
  width: 100%;
`;

const TasksContainer = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;

  @media (min-width: 1024px) {
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

const DragButton = styled.button`
  background-color: #A78B71;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #896550;
  height: 31px;
  width: 55px;

  &:hover {
    background-color: #896550;
  }

  &:active {
    cursor: grab;
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
  margin-left: 0.5rem;

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

  &:hover {
    background-color: #896550;
  }

  @media (max-width: 389px) {
    height: 46px;
  }
`;

const AddTaskButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background-color: #45a049;
  }
`;

const TodoList = memo(({ id, tasks, title, isDragging, isOverlay, setTodoLists }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newListTitle, setNewListTitle] = useState(title);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list and all tasks?')) {
      setTodoLists((prevLists) => prevLists.filter(list => list.id !== id));
    }
  };

  const handleEditListName = () => {
    setIsEditMode(true);
    setNewListTitle(title);
    setIsModalOpen(true);
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

  return (
    <ListContainer ref={setNodeRef} style={style} isDragging={isDragging} isOverlay={isOverlay}>
      <TitleContainer>
        <Title>{title}</Title>
        <ButtonContainer>
          <EditButton onClick={handleEditListName}>Edit</EditButton>
          <AddTaskButton onClick={() => setIsAddTaskModalOpen(true)}>Add Task</AddTaskButton>
          <DeleteButton onClick={handleDeleteList}>Delete</DeleteButton>
          <DragButton  {...attributes} {...listeners}>:::</DragButton>
        </ButtonContainer>
      </TitleContainer>
      <TasksContainer>
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
});

export default TodoList;