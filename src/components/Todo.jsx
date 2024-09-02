import { useState, useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay, defaultDropAnimation } from "@dnd-kit/core";
import { arrayMove } from '@dnd-kit/sortable';

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import ToggleSwitch from "./ToggleSwitch";
import TodoItem from "./TodoItem";

const dropAnimationConfig = { ...defaultDropAnimation };

export function Todo({ setTaskCounter }) {
    const [tasks, setTasks] = useState([]);
    const [isDragEnabled, setIsDragEnabled] = useState(false);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const completedTasksCount = tasks.filter(task => task.isCompleted).length;
        const totalTasksCount = tasks.length;

        setTaskCounter({
            count: `${completedTasksCount}/${totalTasksCount}`,
            color: completedTasksCount === totalTasksCount && totalTasksCount > 0 ? '#0d730b' : '#0077b6',
            show: totalTasksCount > 0
        });
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

    const { activeTasks, completedTasks } = useMemo(() => {
        return tasks.reduce(
            (acc, task) => {
                task.isCompleted ? acc.completedTasks.push(task) : acc.activeTasks.push(task);
                return acc;
            },
            { activeTasks: [], completedTasks: [] }
        );
    }, [tasks]);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeTask = tasks.find((task) => task.id === active.id);

        if (over.id === 'active-tasks' || over.id === 'completed-tasks') {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === activeTask.id ? { ...task, isCompleted: over.id === 'completed-tasks' } : task
                )
            );
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeTask = tasks.find((task) => task.id === active.id);
        const overTask = tasks.find((task) => task.id === over.id);

        if (!activeTask || !overTask || activeTask.isCompleted !== overTask.isCompleted) {
            setActiveId(null);
            return;
        }

        const containerTasks = activeTask.isCompleted ? completedTasks : activeTasks;
        const oldIndex = containerTasks.findIndex((task) => task.id === active.id);
        const newIndex = containerTasks.findIndex((task) => task.id === over.id);

        const sortedTasks = arrayMove(containerTasks, oldIndex, newIndex);

        setTasks((prev) => [
            ...prev.filter((task) => task.isCompleted !== activeTask.isCompleted),
            ...sortedTasks,
        ]);
        setActiveId(null);
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
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
                    <TodoList
                        activeTasks={activeTasks}
                        completedTasks={completedTasks}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        isDragEnabled={isDragEnabled}
                        activeId={activeId}
                    />
                    <DragOverlay dropAnimation={dropAnimationConfig}>
                        {activeId ? (
                            <TodoItem
                                task={tasks.find((task) => task.id === activeId)}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                                isCompleted={tasks.find((task) => task.id === activeId)?.isCompleted}
                                isDragEnabled={false}
                                hideCompleteButton={true}
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