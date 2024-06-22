import {create} from 'zustand';


  export const useAuthStore = create((set) => ({
    
      name: '',
    setname: (name) =>
      set((state) => ({
        name: name ,
      })),
  }));