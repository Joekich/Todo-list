import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { memo } from "react";

const ListContainer = styled.div`
  border: solid 1px #A78B71;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  padding: 1rem;
  width: 100%;
  min-height: 150px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #583E26;
  padding: 1rem;
`;

const DroppableSortableContainer = ({ id, tasks, title, updateTask, deleteTask, isDragEnabled }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <>
            <Title>{title}</Title>
            <ListContainer ref={setNodeRef}>
                {tasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        isCompleted={task.isCompleted}
                        isDragEnabled={isDragEnabled}
                    />
                ))}
            </ListContainer>
        </>
    );
};

const TodoList = memo(({ activeTasks, completedTasks, updateTask, deleteTask, isDragEnabled }) => {
    return (
        <>
            <SortableContext items={activeTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <DroppableSortableContainer
                    id="active-tasks"
                    tasks={activeTasks}
                    title="Active Tasks"
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    isDragEnabled={isDragEnabled}
                />
            </SortableContext>
            <SortableContext items={completedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <DroppableSortableContainer
                    id="completed-tasks"
                    tasks={completedTasks}
                    title="Completed Tasks"
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    isDragEnabled={isDragEnabled}
                />
            </SortableContext>
        </>
    );
});

export default TodoList;