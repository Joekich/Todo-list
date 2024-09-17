import { ListContainer, TitleContainer, Title, ButtonContainer, TasksContainer, DragButton, DeleteButton, EditButton, AddTaskButton, MenuButton, DropdownMenu } from '../TodoList/TodoList.Styles';
import TodoItem from "../TodoItem/TodoItem";
import Modal from "../Modal/Modal";
import ModalAddTask from "../Modal/ModalAddTask";
import AddTaskIcon from '../icons/AddTaskIcon.svg?react';
import TodoListMenuIcon from '../icons/TodoListMenuIcon.svg?react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

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