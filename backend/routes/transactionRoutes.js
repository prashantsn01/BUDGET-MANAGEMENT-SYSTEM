import express from "express";
import transactionController, {
      scanReceipt,
      getFinancialInsights,
} from "../controllers/transactionControllers.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post(
      "/create/:user_id/:budget_id",
      transactionController.createTransaction
);
router.put(
      "/update/:user_id/:transaction_id",
      transactionController.updateTransaction
);
router.delete(
      "/delete/:user_id/:transaction_id",
      transactionController.deleteTransaction
);
router.get("/all/:user_id", transactionController.getAllTransactionsForUser);
router.get(
      "/budget/:budget_id",
      transactionController.getAllTransactionsForBudget
);
router.post("/scan-receipt", upload.single("file"), async (req, res) => {
      try {
            const file = req.file;
            const { userId, budgetId, categories } = req.body;

            if (!file || !userId || !budgetId || !categories) {
                  return res
                        .status(400)
                        .json({ error: "Missing required fields" });
            }

            const parsedCategories = JSON.parse(categories); // expected as stringified array

            const transactionData = await scanReceipt(
                  file,
                  budgetId,
                  userId,
                  parsedCategories
            );

            if (!transactionData) {
                  return res
                        .status(200)
                        .json({ message: "Not a valid receipt", data: null });
            }

            res.status(201).json({
                  message: "Receipt scanned and transaction created",
                  transaction: transactionData,
            });
      } catch (error) {
            console.error("Scan Receipt Error:", error);
            res.status(500).json({
                  error: error.message || "Failed to scan receipt",
            });
      }
});

router.get("/insights/:user_id", getFinancialInsights);

export default router;
