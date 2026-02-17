import { create } from 'zustand';

const useUIStore = create((set) => ({
    selectedTask: null,
    isModalOpen: false,

    openTaskModal: (task) => {
        set({
            selectedTask: task,
            isModalOpen: true
        });
        document.body.style.overflow = 'hidden';
    },

    closeTaskModal: () => {
        set({
            selectedTask: null,
            isModalOpen: false
        });
        document.body.style.overflow = 'auto';
    },

    reset: () => {
        document.body.style.overflow = 'auto';
        set({ selectedTask: null, isModalOpen: false });
    }
}));

export default useUIStore;