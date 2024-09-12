import { create } from 'zustand';
import { SeriesInterface } from "@/types"; // Import the MovieInterface type

export interface ViewStoreInterfacee {
  data?: SeriesInterface[];
  ViewModalopen: boolean;
  title: string;
  openModal: (data: SeriesInterface[], title: string) => void;
  closeViewModal: () => void;
}

const useViewSeriesStore = create<ViewStoreInterfacee>((set) => ({
  data: undefined,
  ViewModalopen: false,
  title: '',
  openModal: (data: SeriesInterface[], title: string) => set({ ViewModalopen: true, data, title }),
  closeViewModal: () => set({ ViewModalopen: false, data: undefined, title: '' }),
}));

export default useViewSeriesStore;
