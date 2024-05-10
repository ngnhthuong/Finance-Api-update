const financeModel = require("../models/financeModel");
const moneyPaymentModel = require("../models/moneyPaymentModel");
const dotenv = require("dotenv");
const validIdMongo = require("../utils/validMongoDB");
dotenv.config();

module.exports = {
//   createRecords: async (req, res) => {
//     try {
//       const { name, member, payment_people } = req.body;

//       const newListMoneyPayment = new moneyPaymentModel({
//         name,
//         member,
//         payment_people,
//       });

//       await newListMoneyPayment.save();

//       res
//         .status(201)
//         .json({ message: "List money payment created successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },
  createRecords: async (req, res) => {
    try {
      const { userId, name } = req.body;
      validIdMongo(userId);
      // Tạo một đối tượng income mới
      const newRecord = await moneyPaymentModel.create({
        name,
      });
      // Tìm người dùng theo userId
      const user = await FinanceUserModel.findById(userId);
      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Thêm thu nhập vào mảng incomes của người dùng
      user.moneypayment.push(newRecord);
      // Lưu thay đổi vào cơ sở dữ liệu
      await user.save();
      res.status(201).json(newRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add income" });
    }
  },
};
