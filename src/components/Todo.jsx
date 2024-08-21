import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export function Todo({ setTaskCounter }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const updateTaskCounter = () => {
            const completedTasksCount = tasks.filter(task => task.isCompleted).length;
            const totalTasksCount = tasks.length;

            const counterColor = completedTasksCount === totalTasksCount && totalTasksCount > 0 ? '#0d730b' : '#0077b6';

            setTaskCounter({
                count: `${completedTasksCount}/${totalTasksCount}`,
                color: counterColor,
                show: totalTasksCount > 0
            });
        };

        updateTaskCounter();
    }, [tasks, setTaskCounter]);

    const addTask = (task) => {
        const newTask = {
            id: nanoid(),
            text: task,
            isCompleted: false
        };

        setTasks([...tasks, newTask]);
    };

    const updateTask = (id, action, newText = '') => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                switch (action) {
                    case 'edit':
                        return { ...task, text: newText };
                    case 'toggle':
                        return { ...task, isCompleted: !task.isCompleted };
                    default:
                        throw new Error(`Unknown action: ${action}`);
                }
            }
            return task;
        });

        setTasks(updatedTasks);
    };

    const deleteTask = (id) => setTasks(tasks.filter((element) => element.id !== id));

    const { activeTasks, completedTasks } = tasks.reduce(
        (acc, task) => {
            if (task.isCompleted) {
                acc.completedTasks.push(task);
            } else {
                acc.activeTasks.push(task);
            }
            return acc;
        },
        { activeTasks: [], completedTasks: [] }
    );

    return (
        <>
            <TodoInput addTask={addTask} />
            <TodoList
                title="Active Tasks"
                tasks={activeTasks}
                updateTask={(id, action, newText) => updateTask(id, action, newText)}
                deleteTask={deleteTask}
            />
            <TodoList
                title="Completed Tasks"
                tasks={completedTasks}
                updateTask={(id, action, newText) => updateTask(id, action, newText)}
                deleteTask={deleteTask}
                isCompleted={true}
            />
        </>
    )
}

export default Todo;