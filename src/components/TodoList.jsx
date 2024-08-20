import styled from "styled-components";
import TodoItem from "./TodoItem";

const ListContainer = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #583E26;
`;

const TodoList = ({ title, tasks, updateTask, deleteTask, isCompleted = false }) => {
    return (
        <ListContainer>
            <Title>{title}</Title>
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    isCompleted={isCompleted}
                />
            ))}
        </ListContainer>
    );
};

export default TodoList;