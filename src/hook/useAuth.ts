import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  token: null, 

  login: (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    set({ isAuthenticated: true, username, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ isAuthenticated: false, username: null, token: null});
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    set({
      isAuthenticated: token !== null,
      username: token !== null ? username : null,
      token: token
    });
  },
}));

export default useAuth;