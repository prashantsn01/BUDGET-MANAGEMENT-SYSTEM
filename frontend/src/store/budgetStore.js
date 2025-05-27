import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URLS } from "../utils/config";

export const useBudgetStore = create(
      persist(
            (set) => ({
                  budgets: [],
                  categories: [],
                  error: null,
                  isLoading: false,

                  createBudget: async (userId, budgetData) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.post(
                                    `${API_URLS.budget}/create/${userId}`,
                                    budgetData
                              );
                              set((state) => ({
                                    budgets: [...state.budgets, response.data],
                                    isLoading: false,
                              }));
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.error ||
                                          "Error creating budget",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  updateBudget: async (userId, budgetId, budgetData) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.put(
                                    `${API_URLS.budget}/update/${userId}/${budgetId}`,
                                    budgetData
                              );
                              set((state) => ({
                                    budgets: state.budgets.map((budget) =>
                                          budget.budget_id === budgetId
                                                ? response.data
                                                : budget
                                    ),
                                    isLoading: false,
                              }));
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.error ||
                                          "Error updating budget",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  deleteBudget: async (userId, budgetId) => {
                        set({ isLoading: true, error: null });
                        try {
                              await axios.delete(
                                    `${API_URLS.budget}/delete/${userId}/${budgetId}`
                              );
                              set((state) => ({
                                    budgets: state.budgets.filter(
                                          (budget) =>
                                                budget.budget_id !== budgetId
                                    ),
                                    isLoading: false,
                              }));
                        } catch (error) {
                              set({
                                    error: "Error deleting budget",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  fetchBudgets: async (userId) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.get(
                                    `${API_URLS.budget}/all/${userId}`
                              );
                              set({ budgets: response.data, isLoading: false });
                        } catch (error) {
                              set({
                                    error: "Error fetching budgets",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  fetchCategories: async () => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.get(
                                    `${API_URLS.budget}/categories`
                              );
                              set({
                                    categories: response.data,
                                    isLoading: false,
                              });
                        } catch (error) {
                              set({
                                    error: "Error fetching categories",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },
                  setError: (error) => set({ error }),
            }),
            {
                  name: "budget-storage",
                  getStorage: () => localStorage,
            }
      )
);
