// src/store/boardStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialColumns } from '../data/mockData';

const useBoardStore = create(
    persist(
        (set, get) => ({
            columns: initialColumns, // Начальные данные (используются если в localStorage ничего нет)

            // Добавление новой задачи в Backlog
            addTask: (columnId, taskTitle) => {
                if (!taskTitle.trim()) return;

                set((state) => ({
                    columns: state.columns.map(col =>
                        col.id === columnId
                            ? {
                                ...col,
                                tasks: [...col.tasks, {
                                    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                    title: taskTitle.trim(),
                                    description: '',
                                    completed: false,
                                    priority: 'medium',
                                    createdAt: new Date().toISOString()
                                }]
                            }
                            : col
                    )
                }));
            },

            // Перемещение задачи из Backlog в Ready
            moveFromBacklogToReady: (taskId) => {
                set((state) => {
                    const backlogColumn = state.columns.find(col => col.id === 'backlog');
                    const readyColumn = state.columns.find(col => col.id === 'ready');

                    if (!backlogColumn || !readyColumn) return state;

                    const taskIndex = backlogColumn.tasks.findIndex(t => t.id === taskId);
                    if (taskIndex === -1) return state;

                    const taskToMove = { ...backlogColumn.tasks[taskIndex] };

                    const newColumns = state.columns.map(col => {
                        if (col.id === 'backlog') {
                            return {
                                ...col,
                                tasks: col.tasks.filter(t => t.id !== taskId)
                            };
                        }
                        if (col.id === 'ready') {
                            return {
                                ...col,
                                tasks: [...col.tasks, taskToMove]
                            };
                        }
                        return col;
                    });

                    return { columns: newColumns };
                });
            },

            // Перемещение задачи из Ready в In Progress
            moveFromReadyToInProgress: (taskId) => {
                set((state) => {
                    const readyColumn = state.columns.find(col => col.id === 'ready');
                    const inProgressColumn = state.columns.find(col => col.id === 'inProgress');

                    if (!readyColumn || !inProgressColumn) return state;

                    const taskIndex = readyColumn.tasks.findIndex(t => t.id === taskId);
                    if (taskIndex === -1) return state;

                    const taskToMove = { ...readyColumn.tasks[taskIndex] };

                    const newColumns = state.columns.map(col => {
                        if (col.id === 'ready') {
                            return {
                                ...col,
                                tasks: col.tasks.filter(t => t.id !== taskId)
                            };
                        }
                        if (col.id === 'inProgress') {
                            return {
                                ...col,
                                tasks: [...col.tasks, taskToMove]
                            };
                        }
                        return col;
                    });

                    return { columns: newColumns };
                });
            },

            // Перемещение задачи из In Progress в Finished
            moveFromInProgressToFinished: (taskId) => {
                set((state) => {
                    const inProgressColumn = state.columns.find(col => col.id === 'inProgress');
                    const finishedColumn = state.columns.find(col => col.id === 'finished');

                    if (!inProgressColumn || !finishedColumn) return state;

                    const taskIndex = inProgressColumn.tasks.findIndex(t => t.id === taskId);
                    if (taskIndex === -1) return state;

                    const taskToMove = {
                        ...inProgressColumn.tasks[taskIndex],
                        completed: true
                    };

                    const newColumns = state.columns.map(col => {
                        if (col.id === 'inProgress') {
                            return {
                                ...col,
                                tasks: col.tasks.filter(t => t.id !== taskId)
                            };
                        }
                        if (col.id === 'finished') {
                            return {
                                ...col,
                                tasks: [...col.tasks, taskToMove]
                            };
                        }
                        return col;
                    });

                    return { columns: newColumns };
                });
            },

            // Удаление задачи
            deleteTask: (taskId) => {
                set((state) => ({
                    columns: state.columns.map(col => ({
                        ...col,
                        tasks: col.tasks.filter(task => task.id !== taskId)
                    }))
                }));
            },

            // Редактирование задачи
            editTask: (taskId, updatedTask) => {
                set((state) => ({
                    columns: state.columns.map(col => ({
                        ...col,
                        tasks: col.tasks.map(task =>
                            task.id === taskId ? { ...task, ...updatedTask } : task
                        )
                    }))
                }));
            },

            // Перемещение колонки
            moveColumn: (sourceIndex, destIndex) => {
                set((state) => {
                    const newColumns = [...state.columns];
                    const [movedColumn] = newColumns.splice(sourceIndex, 1);
                    newColumns.splice(destIndex, 0, movedColumn);
                    return { columns: newColumns };
                });
            },

            // Сброс к начальным данным (опционально)
            resetToInitial: () => {
                set({ columns: initialColumns });
            },

            // Очистка всех задач (опционально)
            clearAllTasks: () => {
                set((state) => ({
                    columns: state.columns.map(col => ({
                        ...col,
                        tasks: []
                    }))
                }));
            }
        }),
        {
            name: 'kanban-board-storage', // Ключ в localStorage
            getStorage: () => localStorage, // Используем localStorage (по умолчанию)
        }
    )
);

export default useBoardStore;