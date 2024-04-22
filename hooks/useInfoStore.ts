import { create } from 'zustand';
import { MovieInterface } from "@/types"; // Import the MovieInterface type

export interface ModalStoreInterface {
  signleInfo?: MovieInterface;
  isOpen: boolean;
  openModal: (signleInfo: MovieInterface) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  signleInfo: undefined,
  isOpen: false,
  openModal: (signleInfo: MovieInterface) => set({ isOpen: true, signleInfo }),
  closeModal: () => set({ isOpen: false, signleInfo: undefined }),
}));

export default useInfoModalStore;
