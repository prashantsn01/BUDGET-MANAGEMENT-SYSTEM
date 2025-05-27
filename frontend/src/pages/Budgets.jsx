import { useAuthStore } from "../store/authStore";
import { useBudgetStore } from "../store/budgetStore";
import { useEffect } from "react";
import BudgetGrid from "../components/BudgetComponents/BudgetGrid";

const Budgets = () => {
      const { user } = useAuthStore();
      const { fetchBudgets, budgets } = useBudgetStore();

      useEffect(() => {
            fetchBudgets(user.user_id);
      }, []);
      return (
            <div className=" overflow-y-auto w-full">
                  <BudgetGrid budgets={budgets} />
            </div>
      );
};

export default Budgets;
