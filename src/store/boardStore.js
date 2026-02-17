import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialColumns } from '../data/mockData';

const useBoardStore = create(
    persist(
        (set, get) => ({
            columns: initialColumns,

            // Добавление задачи
            addTask: (columnId, taskTitle) => {
                set((state) => ({
                    columns: state.columns.map(col =>
                        col.id === columnId
                            ? {
                                ...col,
                                tasks: [...col.tasks, {
                                    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                    title: taskTitle,
                                    description: '',
                                    completed: columnId === 'finished',
                                    priority: 'medium'
                                }]
                            }
                            : col
                    )
                }));
            },

            // Перемещение задачи
            moveTask: (taskId, sourceColId, destColId, sourceIndex, destIndex) => {
                set((state) => {
                    const sourceColumn = state.columns.find(col => col.id === sourceColId);
                    const destColumn = state.columns.find(col => col.id === destColId);

                    if (!sourceColumn || !destColumn) return state;

                    const taskCopy = { ...sourceColumn.tasks[sourceIndex] };

                    // Обновляем статус completed при перемещении
                    if (destColId === 'finished') {
                        taskCopy.completed = true;
                    } else if (sourceColId === 'finished') {
                        taskCopy.completed = false;
                    }

                    const newColumns = state.columns.map(col => {
                        if (col.id === sourceColId) {
                            return {
                                ...col,
                                tasks: col.tasks.filter((_, idx) => idx !== sourceIndex)
                            };
                        }
                        if (col.id === destColId) {
                            const newTasks = [...col.tasks];
                            newTasks.splice(destIndex, 0, taskCopy);
                            return { ...col, tasks: newTasks };
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
            }
        }),
        {
            name: 'kanban-board-storage',
        }
    )
);

export default useBoardStore;