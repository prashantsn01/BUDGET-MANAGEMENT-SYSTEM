import express from "express";
import budgetController from "../controllers/budgetControllers.js";

const router = express.Router();

router.post("/create/:user_id", budgetController.createBudget);
router.put("/update/:user_id/:budget_id", budgetController.updateBudget);
router.delete("/delete/:user_id/:budget_id", budgetController.deleteBudget);
router.get("/all/:user_id", budgetController.getAllBudgets);
router.get("/categories", budgetController.getBudgetCategories);

export default router;
