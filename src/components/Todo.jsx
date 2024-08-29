import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from "@dnd-kit/core";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import ToggleSwitch from "./ToggleSwitch";
import TodoItem from "./TodoItem";

export function Todo({ setTaskCounter }) {
    const [tasks, setTasks] = useState([]);
    const [isDragEnabled, setIsDragEnabled] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [dragItemDimensions, setDragItemDimensions] = useState({ width: 0, height: 0 });

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

    const handleDragStart = (event) => {
        const activeElement = event.active?.node;

        if (activeElement) {
            const { width, height } = activeElement.getBoundingClientRect();
            setDragItemDimensions({ width, height });
        }

        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        setActiveId(null);
        setDragItemDimensions({ width: 0, height: 0 });

        const { active, over } = event;

        const activeTask = tasks.find((task) => task.id === active.id);

        if (!over) {
            const isMovingToCompleted = activeTask.isCompleted === false;

            const updatedTasks = tasks.map((task) =>
                task.id === active.id ? { ...task, isCompleted: isMovingToCompleted } : task
            );

            setTasks(updatedTasks);
            return;
        }

        const overTask = tasks.find((task) => task.id === over.id);

        if (activeTask.isCompleted !== overTask.isCompleted) {
            const updatedTasks = tasks.map((task) =>
                task.id === active.id ? { ...task, isCompleted: !task.isCompleted } : task
            );

            setTasks(updatedTasks);
            return;
        }

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(oldIndex, 1);
        updatedTasks.splice(newIndex, 0, movedTask);

        setTasks(updatedTasks);
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

    const handleToggleDragMode = () => { setIsDragEnabled((prev) => !prev); };

    return (
        <>
            <ToggleSwitch
                isChecked={isDragEnabled}
                onChange={handleToggleDragMode}
                setIsDragEnabled={setIsDragEnabled}
            />
            <TodoInput addTask={addTask} />
            {isDragEnabled ? (
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <TodoList
                        activeTasks={activeTasks}
                        completedTasks={completedTasks}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        isDragEnabled={isDragEnabled}
                    />
                    <DragOverlay>
                        {activeId ? (
                            <TodoItem
                                task={tasks.find((task) => task.id === activeId)}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                                isCompleted={tasks.find((task) => task.id === activeId)?.isCompleted}
                                isDragEnabled={false}
                                hideCompleteButton={true}
                                dragItemDimensions={dragItemDimensions}
                                isDragged={true}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            ) : (
                <TodoList
                    activeTasks={activeTasks}
                    completedTasks={completedTasks}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            )}
        </>
    );
}

export default Todo;