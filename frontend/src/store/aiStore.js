import { create } from "zustand";
import axios from "axios";
import { API_URLS } from "../utils/config";

export const useAIStore = create((set) => ({
      insights: [],
      error: null,
      isAILoading: false,

      scanReceipt: async (file, userId, budgetId, categories) => {
            set({ isAILoading: true, error: null });
            try {
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("userId", userId);
                  formData.append("budgetId", budgetId);
                  formData.append("categories", JSON.stringify(categories));

                  const response = await axios.post(
                        `${API_URLS.transaction}/scan-receipt`,
                        formData,
                        {
                              headers: {
                                    "Content-Type": "multipart/form-data",
                              },
                        }
                  );
                  return response.data;
            } catch (error) {
                  set({
                        error:
                              error.response?.data?.error ||
                              "Error scanning receipt",
                        isAILoading: false,
                  });
                  throw error;
            } finally {
                  set({ isAILoading: false });
            }
      },

      fetchFinancialInsights: async (userId) => {
            set({ isAILoading: true, error: null });
            try {
                  const response = await axios.get(
                        `${API_URLS.transaction}/insights/${userId}`
                  );

                  set({
                        insights: response.data.insights,
                  });
            } catch (error) {
                  set({
                        error:
                              error.response?.data?.error ||
                              "Failed to fetch financial insights",
                  });
                  throw error;
            } finally {
                  set({ isAILoading: false });
            }
      },
}));
