import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CommandMenuState {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useCommandMenuStore = create<CommandMenuState>()(
    devtools(set => ({
        open: false,
        setOpen: open => set({ open })
    }))
);

export { useCommandMenuStore };
