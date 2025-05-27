import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URLS } from "../utils/config";

export const useTransactionStore = create(
      persist(
            (set) => ({
                  userTransactions: [],
                  budgetTransactions: [],
                  error: null,
                  isLoading: false,

                  createTransaction: async (
                        userId,
                        budgetId,
                        transactionData
                  ) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.post(
                                    `${API_URLS.transaction}/create/${userId}/${budgetId}`,
                                    transactionData
                              );
                              set((state) => ({
                                    userTransactions: [
                                          ...state.userTransactions,
                                          response.data,
                                    ],
                                    budgetTransactions: [
                                          ...state.budgetTransactions,
                                          response.data,
                                    ],
                                    isLoading: false,
                              }));
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.error ||
                                          "Error creating transaction",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  updateTransaction: async (
                        userId,
                        transactionId,
                        transactionData
                  ) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.put(
                                    `${API_URLS.transaction}/update/${userId}/${transactionId}`,
                                    transactionData
                              );
                              set((state) => ({
                                    userTransactions:
                                          state.userTransactions.map((tx) =>
                                                tx.transaction_id ===
                                                transactionId
                                                      ? response.data
                                                      : tx
                                          ),
                                    budgetTransactions:
                                          state.budgetTransactions.map((tx) =>
                                                tx.transaction_id ===
                                                transactionId
                                                      ? response.data
                                                      : tx
                                          ),
                                    isLoading: false,
                              }));
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.error ||
                                          "Error updating transaction",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  deleteTransaction: async (userId, transactionId) => {
                        set({ isLoading: true, error: null });
                        try {
                              await axios.delete(
                                    `${API_URLS.transaction}/delete/${userId}/${transactionId}`
                              );
                              set((state) => ({
                                    userTransactions:
                                          state.userTransactions.filter(
                                                (tx) =>
                                                      tx.transaction_id !==
                                                      transactionId
                                          ),
                                    budgetTransactions:
                                          state.budgetTransactions.filter(
                                                (tx) =>
                                                      tx.transaction_id !==
                                                      transactionId
                                          ),
                                    isLoading: false,
                              }));
                        } catch (error) {
                              set({
                                    error: "Error deleting transaction",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  fetchUserTransactions: async (userId) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.get(
                                    `${API_URLS.transaction}/all/${userId}`
                              );
                              set({
                                    userTransactions: response.data,
                                    isLoading: false,
                              });
                        } catch (error) {
                              set({
                                    error: "Error fetching user transactions",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  fetchBudgetTransactions: async (budgetId) => {
                        set({ isLoading: true, error: null });
                        try {
                              const response = await axios.get(
                                    `${API_URLS.transaction}/budget/${budgetId}`
                              );
                              set({
                                    budgetTransactions: response.data,
                                    isLoading: false,
                              });
                        } catch (error) {
                              set({
                                    error: "Error fetching budget transactions",
                                    isLoading: false,
                              });
                              throw error;
                        }
                  },

                  scanReceipt: async (file, userId, budgetId, categories) => {
                        set({ isLoading: true, error: null });
                        try {
                              const formData = new FormData();
                              formData.append("file", file);
                              formData.append("userId", userId);
                              formData.append("budgetId", budgetId);
                              formData.append(
                                    "categories",
                                    JSON.stringify(categories)
                              );

                              const response = await axios.post(
                                    `${API_URLS.transaction}/scan-receipt`,
                                    formData,
                                    {
                                          headers: {
                                                "Content-Type":
                                                      "multipart/form-data",
                                          },
                                    }
                              );
                              return response.data;
                        } catch (error) {
                              set({
                                    error:
                                          error.response?.data?.error ||
                                          "Error scanning receipt",
                                    isLoading: false,
                              });
                              throw error;
                        } finally {
                              set({ isLoading: false });
                        }
                  },

                  setError: (error) => set({ error }),
            }),
            {
                  name: "transaction-storage",
                  getStorage: () => localStorage,
            }
      )
);
