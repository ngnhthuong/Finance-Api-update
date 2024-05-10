const router = require("express").Router();

const financeControler = require("../controllers/financeControllers.js");

router.post("/register", financeControler.register);
router.post("/login", financeControler.login);
router.get("/getUser/:id", financeControler.getUser);
router.put("/updateUser/:id", financeControler.updatePremium);

module.exports = router;
