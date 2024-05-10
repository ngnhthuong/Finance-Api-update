const IncomeModel = require("../models/incomeModel");
const FinanceUserModel = require("../models/financeModel");
const validIdMongo = require("../utils/validMongoDB");

module.exports = {
  addIncome: async (req, res) => {
    try {
      const { userId, categoriesIncome, date, value, note } = req.body;
      validIdMongo(userId);
      // Tạo một đối tượng income mới
      const newIncome = await IncomeModel.create({
        categoriesIncome,
        date,
        value,
        note,
      });
      // Tìm người dùng theo userId
      const user = await FinanceUserModel.findById(userId);
      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Thêm thu nhập vào mảng incomes của người dùng
      user.incomes.push(newIncome);
      // Lưu thay đổi vào cơ sở dữ liệu
      await user.save();
      res.status(201).json(newIncome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add income" });
    }
  },

  deleteIncome: async (req, res) => {
    try {
      const { userId, incomeId } = req.params;
      validIdMongo(userId);
      validIdMongo(incomeId);
      const user = await FinanceUserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const incomeIndex = user.incomes.findIndex(
        (income) => income._id.toString() === incomeId
      );

      if (incomeIndex === -1) {
        return res.status(404).json({ error: "Income not found" });
      }

      const deletedIncome = user.incomes.splice(incomeIndex, 1)[0];
      await user.save();

      // Xoá thu nhập khỏi cơ sở dữ liệu
      await IncomeModel.findByIdAndDelete(incomeId);

      res.status(200).json(deletedIncome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete income" });
    }
  },

  getIncome: async (req, res) => {
    try {
      const { userId, incomeId } = req.params;
      validIdMongo(userId);
      validIdMongo(incomeId);

      const user = await FinanceUserModel.findById(userId).populate("incomes");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const income = user.incomes.find(
        (income) => income._id.toString() === incomeId
      );

      if (!income) {
        return res.status(404).json({ error: "Income not found" });
      }

      // Format the date in the income
      const formattedIncome = {
        ...income.toObject(),
        date: income.date.toISOString().split("T")[0],
      };

      res.status(200).json(formattedIncome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get income" });
    }
  },

  getIncomes: async (req, res) => {
    try {
      const { userId } = req.params;
      validIdMongo(userId);
      const user = await FinanceUserModel.findById(userId).populate("incomes");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Filter out null incomes
      const incomes = user.incomes.filter((income) => income !== null);
      // Format the date in each income
      const formattedIncomes = incomes.map((income) => ({
        ...income.toObject(),
        date: income.date.toISOString().split("T")[0],
      }));

      res.status(200).json(formattedIncomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get incomes" });
    }
  },

  getIncomesByCurrentMonth: async (req, res) => {
    try {
      const { userId } = req.params;
      validIdMongo(userId);

      const user = await FinanceUserModel.findById(userId).populate("incomes");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Get the current month (1-indexed)
      const currentMonth = new Date().getMonth() + 1;

      // Filter incomes by the current month
      const filteredIncomes = user.incomes.filter((income) => {
        const incomeMonth = income.date.getMonth() + 1; // Month is zero-based
        return incomeMonth === currentMonth;
      });

      // Format the date in each income
      const formattedIncomes = filteredIncomes.map((income) => ({
        ...income.toObject(),
        date: income.date.toISOString().split("T")[0],
      }));

      res.status(200).json(formattedIncomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get incomes" });
    }
  },

  getIncomeByMonthAndYear: async (req, res) => {
    try {
      const { userId, month, year } = req.params;
      validIdMongo(userId);

      console.log("Selected Month and Year:", month, year);

      const formattedMonth = new Date(`${year}-${month}-01`)
        .toISOString()
        .slice(0, 7);

      const firstDayOfMonth = new Date(`${formattedMonth}-01`);
      const lastDayOfMonth = new Date(`${formattedMonth}-31`);
      const user = await FinanceUserModel.findById(userId).populate({
        path: "incomes",
        match: {
          date: { $gte: firstDayOfMonth, $lt: lastDayOfMonth },
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Filter out null incomes
      const incomes = user.incomes.filter((income) => income !== null);

      // Format the date in each income
      const formattedIncomes = incomes.map((income) => ({
        ...income.toObject(),
        date: income.date.toISOString().split("T")[0],
      }));

      res.status(200).json(formattedIncomes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Failed to get incomes for the month and year" });
    }
  },

  getTotalIncomesMonthByYear: async (req, res) => {
    try {
      const { userId, year } = req.params;
      validIdMongo(userId);

      const user = await FinanceUserModel.findById(userId).populate("incomes");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Filter incomes by the specified year
      const filteredIncomes = user.incomes.filter((income) => {
        const incomeYear = income.date.getFullYear();
        return incomeYear.toString() === year;
      });

      // Initialize the monthlyTotalIncomes array with default values of 0
      const monthlyTotalIncomes = Array.from({ length: 12 }, () => 0);

      // Update the monthlyTotalIncomes array based on actual incomes
      filteredIncomes.forEach((income) => {
        const incomeMonth = income.date.getMonth(); // Month is zero-based
        monthlyTotalIncomes[incomeMonth] += income.value; // Assuming there's an 'amount' property in your income model
      });

      // Create the desired data structure
      const data = {
        labels: Array.from({ length: 12 }, (_, index) =>
          (index + 1).toString()
        ),
        datasets: [
          {
            data: monthlyTotalIncomes,
          },
        ],
      };

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get incomes" });
    }
  },

  updateIncome: async (req, res) => {
    try {
      const { userId, incomeId } = req.params;
      const { categoriesIncome, date, value, note } = req.body;
      validIdMongo(userId);
      validIdMongo(incomeId);
      const user = await FinanceUserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const incomeIndex = user.incomes.findIndex(
        (income) => income._id.toString() === incomeId
      );

      if (incomeIndex === -1) {
        return res.status(404).json({ error: "Income not found" });
      }

      // Update fields in the FinanceUserModel
      user.incomes[incomeIndex].categoriesIncome = categoriesIncome;
      user.incomes[incomeIndex].date = date;
      user.incomes[incomeIndex].value = value;
      user.incomes[incomeIndex].note = note;
      await user.save();

      // Cập nhật thông tin thu nhập trong cơ sở dữ liệu
      const updatedIncome = await IncomeModel.findByIdAndUpdate(
        incomeId,
        { categoriesIncome, date, value, note },
        { new: true }
      );
      res.status(200).json(updatedIncome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update income" });
    }
  },

  deleteAllIncome: async (req, res) => {
    try {
      const { userId } = req.params;
      validIdMongo(userId);
      const user = await FinanceUserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const incomeIds = user.incomes.map((income) => income._id);
      user.incomes = [];
      await user.save();
      await IncomeModel.deleteMany({ _id: { $in: incomeIds } });
      res.status(200).json({ message: "All incomes deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete all incomes" });
    }
  },
};
