import { create } from 'zustand'

export const useEventModalStore = create((set) => ({
		event: false,
    setEvent: (event) => set(() => (
      { event }
    )),
	})
);

