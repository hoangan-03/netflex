import { create } from 'zustand';
import { MovieInterface } from "@/types"; // Import the MovieInterface type

export interface ViewStoreInterface {
  data?: MovieInterface[];
  ViewModalopen: boolean;
  title: string;
  openModal: (data: MovieInterface[], title: string) => void;
  closeViewModal: () => void;
}

const useViewStore = create<ViewStoreInterface>((set) => ({
  data: undefined,
  ViewModalopen: false,
  title: '',
  openModal: (data: MovieInterface[], title: string) => set({ ViewModalopen: true, data, title }),
  closeViewModal: () => set({ ViewModalopen: false, data: undefined, title: '' }),
}));

export default useViewStore;
