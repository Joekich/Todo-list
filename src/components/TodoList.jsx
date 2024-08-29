import styled from "styled-components";
import TodoItem from "./TodoItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const ListContainer = styled.div`
  width: 100%;
  border: solid 1px #A78B71;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #583E26;
  padding: 1rem;
`;

const TodoList = ({ activeTasks, completedTasks, updateTask, deleteTask, isDragEnabled }) => {
    return (
        <ListContainer>
            <Title>Active Tasks</Title>
            <SortableContext items={activeTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                {activeTasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        isCompleted={false}
                        isDragEnabled={isDragEnabled}
                    />
                ))}
            </SortableContext>
            <Title>Completed Tasks</Title>
            <SortableContext items={completedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                {completedTasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        isCompleted={true}
                        isDragEnabled={isDragEnabled}
                    />
                ))}
            </SortableContext>
        </ListContainer>
    );
};

export default TodoList;