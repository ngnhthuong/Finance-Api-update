const router = require("express").Router();

const moneyPaymentController = require("../controllers/moneyPaymentControllers");

router.post("/createRecords", moneyPaymentController.createRecords);

module.exports = router;
