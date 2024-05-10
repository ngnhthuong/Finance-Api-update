const router = require("express").Router();

const expensesController = require("../controllers/expensesControllers");

router.post("/addExpenses", expensesController.addExpenses);
router.delete(
  "/deleteExpenses/:userId/:expensesId",
  expensesController.deleteExpenses
);
router.get("/getExpense/:userId/:expensesId", expensesController.getOneExpense);
router.get("/getExpenses/:userId", expensesController.getAllExpense);
router.get(
  "/getExpensesByCurrentMonth/:userId",
  expensesController.getExpensesByCurrentMonth
);
router.get(
  "/getExpensesByMonthAndYear/:userId/:month/:year",
  expensesController.getExpensesByMonthAndYear
);

router.get(
  "/getTotalExpensesMonthByYear/:userId/:year",
  expensesController.getTotalExpensesMonthByYear
);
router.put(
  "/updateExpenses/:userId/:expensesId",
  expensesController.updateExpenses
);
router.delete(
  "/deleteAllExpenses/:userId",
  expensesController.deleteAllExpenses
);
module.exports = router;
