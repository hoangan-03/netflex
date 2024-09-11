// hooks/useSeriesInfoStore.ts
import { create } from 'zustand';
import { SeriesInterface } from '@/types';

interface SeriesInfoStoreInterface {
  seriesInfo?: SeriesInterface;
  isOpen: boolean;
  openModal: (seriesInfo: SeriesInterface) => void;
  closeModal: () => void;
}

const useSeriesInfoStore = create<SeriesInfoStoreInterface>((set) => ({
  seriesInfo: undefined,
  isOpen: false,
  openModal: (seriesInfo: SeriesInterface) => set({ isOpen: true, seriesInfo }),
  closeModal: () => set({ isOpen: false, seriesInfo: undefined }),
}));

export default useSeriesInfoStore;