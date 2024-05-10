const router = require("express").Router();

// const financeControler = require("../controllers/financeControllers.js");
const moneyPaymentController = require("../controllers/moneyPaymentControllers");

router.post("/createRecords", moneyPaymentController.createRecords);

module.exports = router;
