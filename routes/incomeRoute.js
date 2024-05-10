const router = require("express").Router();

const incomeController = require("../controllers/incomeControllers");

router.post("/addIncome", incomeController.addIncome);
router.delete("/deleteIncome/:userId/:incomeId", incomeController.deleteIncome);
router.get("/getIncome/:userId/:incomeId", incomeController.getIncome);
router.get("/getIncomes/:userId", incomeController.getIncomes);
router.get(
  "/getIncomesByCurrentMonth/:userId",
  incomeController.getIncomesByCurrentMonth
);
router.get(
  "/getTotalIncomesMonthByYear/:userId/:year",
  incomeController.getTotalIncomesMonthByYear
);
router.get(
  "/getIncomeByMonthAndYear/:userId/:month/:year",
  incomeController.getIncomeByMonthAndYear
);
router.put("/updateIncome/:userId/:incomeId", incomeController.updateIncome);
router.delete("/deleteAllIncome/:userId", incomeController.deleteAllIncome);

module.exports = router;
