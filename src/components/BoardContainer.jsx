import { DndContext, useSensor, useSensors, PointerSensor, TouchSensor, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TodoList from "./TodoList/TodoList";
import TodoItem from "./TodoItem/TodoItem";
import styled from "styled-components";
import { useState } from "react";

const BoardContainerWrapper = styled.section`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 650px;
  margin-top: 1rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
    border: 3px solid transparent;
  }

  &:hover {
    &::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.scrollbarBackground};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.scrollbarThumb};
      border: 3px solid ${({ theme }) => theme.scrollbarBorder};
    }
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.scrollbarThumbHover};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.scrollbarTrack};
    border-radius: 10px;
  }
`;

const BoardContainer = ({ todoLists, setTodoLists }) => {
    const [activeId, setActiveId] = useState(null);
    const [draggingItem, setDraggingItem] = useState(null);
    const [activeContainer, setActiveContainer] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 10,
                tolerance: 5,
            },
        })
    );

    const findTaskById = (id) => {
        return todoLists.flatMap(list => list.tasks).find(task => task.id === id);
    };

    const findContainerById = (id) => {
        return todoLists.find(list => list.id === id || list.tasks.some(task => task.id === id))?.id;
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);

        const activeList = todoLists.find((list) => list.id === active.id);
        if (activeList) {
            setDraggingItem({ type: "list", id: active.id });
            setActiveContainer(null);
        } else {
            const activeTask = findTaskById(active.id);
            if (activeTask) {
                setDraggingItem({ type: "task", id: active.id });
                setActiveContainer(findContainerById(active.id));
            }
        }
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (draggingItem?.type === "task" && activeContainer) {
            const overContainerId = findContainerById(over.id);

            if (activeContainer !== overContainerId) {
                setTodoLists((prevLists) => {
                    const newLists = [...prevLists];
                    const activeListIndex = newLists.findIndex((list) => list.id === activeContainer);
                    const overListIndex = newLists.findIndex((list) => list.id === overContainerId);

                    if (activeListIndex !== -1 && overListIndex !== -1) {
                        const activeTaskIndex = newLists[activeListIndex].tasks.findIndex((task) => task.id === active.id);
                        const [movedTask] = newLists[activeListIndex].tasks.splice(activeTaskIndex, 1);

                        const overTaskIndex = newLists[overListIndex].tasks.findIndex((task) => task.id === over.id);
                        if (overTaskIndex === -1) {
                            newLists[overListIndex].tasks.push(movedTask);
                        } else {
                            newLists[overListIndex].tasks.splice(overTaskIndex, 0, movedTask);
                        }

                        setActiveContainer(overContainerId);
                    }

                    return newLists;
                });
            }
        } else if (draggingItem?.type === "list") {
            const activeIndex = todoLists.findIndex((list) => list.id === active.id);
            const overIndex = todoLists.findIndex((list) => list.id === over.id);

            if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
                setTodoLists((prevLists) => arrayMove(prevLists, activeIndex, overIndex));
            }
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
        setDraggingItem(null);
        setActiveContainer(null);

        if (!over) return;

        if (draggingItem?.type === "list") {
            const activeIndex = todoLists.findIndex((list) => list.id === active.id);
            const overIndex = todoLists.findIndex((list) => list.id === over.id);

            if (activeIndex !== overIndex) {
                setTodoLists((prevLists) => arrayMove(prevLists, activeIndex, overIndex));
            }
        } else if (draggingItem?.type === "task") {
            const activeContainerId = findContainerById(active.id);
            const overContainerId = findContainerById(over.id);

            if (activeContainerId && overContainerId) {
                const activeTaskIndex = todoLists
                    .find((list) => list.id === activeContainerId)
                    ?.tasks.findIndex((task) => task.id === active.id);
                const overTaskIndex = todoLists
                    .find((list) => list.id === overContainerId)
                    ?.tasks.findIndex((task) => task.id === over.id);

                if (activeContainerId === overContainerId && activeTaskIndex !== -1 && overTaskIndex !== -1) {
                    setTodoLists((prevLists) =>
                        prevLists.map((list) =>
                            list.id === activeContainerId
                                ? { ...list, tasks: arrayMove(list.tasks, activeTaskIndex, overTaskIndex) }
                                : list
                        )
                    );
                } else if (activeContainerId !== overContainerId) {
                    setTodoLists((prevLists) => {
                        const newLists = [...prevLists];

                        const activeContainer = newLists.find((list) => list.id === activeContainerId);
                        const [movedTask] = activeContainer.tasks.splice(activeTaskIndex, 1);

                        const overContainer = newLists.find((list) => list.id === overContainerId);
                        overContainer.tasks.splice(overTaskIndex !== -1 ? overTaskIndex : overContainer.tasks.length, 0, movedTask);

                        return newLists;
                    });
                }
            }
        }
    };

    const activeList = activeId ? todoLists.find((list) => list.id === activeId) : null;
    const activeTask = activeId ? findTaskById(activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <BoardContainerWrapper>
                <SortableContext
                    items={todoLists.map((list) => list.id)}
                    strategy={rectSortingStrategy}
                >
                    {todoLists.map((list) => (
                        <SortableContext
                            key={list.id}
                            items={list.tasks.map((task) => task.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <TodoList
                                id={list.id}
                                tasks={list.tasks}
                                title={list.title}
                                todoLists={todoLists}
                                setTodoLists={setTodoLists}
                                isDragging={draggingItem?.id === list.id}
                                isOverlay={false}
                            />
                        </SortableContext>
                    ))}
                </SortableContext>
            </BoardContainerWrapper>
            <DragOverlay>
                {draggingItem?.type === "list" && activeList ? (
                    <TodoList
                        id={activeList.id}
                        tasks={activeList.tasks}
                        title={activeList.title}
                        isOverlay={true}
                    />
                ) : draggingItem?.type === "task" && activeTask ? (
                    <TodoItem
                        task={activeTask}
                        isDragging={true}
                        isOverlay={true} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default BoardContainer;