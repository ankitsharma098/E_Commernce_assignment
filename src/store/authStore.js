import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (credentials) => {
        // Mock auth — any valid email+password succeeds
        const user = {
          id: Date.now(),
          name: credentials.name || credentials.email.split('@')[0],
          email: credentials.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        };
        set({ user, isAuthenticated: true });
        return user;
      },

      signup: (data) => {
        const user = {
          id: Date.now(),
          name: data.name,
          email: data.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        };
        set({ user, isAuthenticated: true });
        return user;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      getUser: () => get().user,
    }),
    {
      name: 'shopvibe-auth',
    }
  )
);

export default useAuthStore;
