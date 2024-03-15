import {create} from 'zustand';

const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
//   host: 0.0.0.0,
  setAuth: (user, isAuthenticated) => set((state) => {
    state.user = user
    state.isAuthenticated = isAuthenticated
  })
}))

export default useStore;