import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URLS } from "../utils/config";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
      persist(
            (set) => ({
                  user: null,
                  isAuthenticated: false,
                  error: null,
                  isLoading: false,

                  signup: async (email, password, username) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.post(
                                    `${API_URLS.auth}/signup`,
                                    {
                                          username,
                                          email,
                                          password,
                                    }
                              );
                              set({
                                    user: response.data.user,
                                    isAuthenticated: true,
                                    isLoading: false,
                              });
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.error ||
                                          "Error signing up",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  login: async (email, password) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.post(
                                    `${API_URLS.auth}/login`,
                                    {
                                          email,
                                          password,
                                    }
                              );
                              set({
                                    isAuthenticated: true,
                                    user: response.data.user,
                                    error: null,
                                    isLoading: false,
                              });
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.message ||
                                          "Error logging in",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  logout: async () => {
                        set({ isLoading: true, error: null });
                        try {
                              await axios.post(`${API_URLS.auth}/logout`);
                              set({
                                    user: null,
                                    isAuthenticated: false,
                                    error: null,
                                    isLoading: false,
                              });
                        } catch (error) {
                              set({
                                    error: "Error logging out",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  setError: (error) => set({ error }), // Added this function to clear errors
            }),
            {
                  name: "auth-storage", // key for localStorage
                  getStorage: () => localStorage, // (optional) by default it uses localStorage
            }
      )
);
