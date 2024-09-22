import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TaskContainer, TaskNameContainer, TaskContentContainer } from './TaskPageStyles';
import { defaultTheme, darkTheme } from '../Themes';
import { ThemeProvider } from 'styled-components';

const TaskPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme(darkTheme);
        }

        const storedLists = JSON.parse(localStorage.getItem('todoLists'));
        if (storedLists) {
            const foundTask = storedLists.flatMap(list => list.tasks).find(task => task.id === id);
            setTask(foundTask);
        }
    }, [id]);

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <TaskContainer>
                <TaskNameContainer>
                    <h2>{task.text}</h2>
                </TaskNameContainer>
                <TaskContentContainer>
                    <p>{task.content}</p>
                </TaskContentContainer>
            </TaskContainer>
        </ThemeProvider>
    );
};

export default TaskPage;