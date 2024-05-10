const FinanceUserModel = require("../models/financeModel");
const moneyPaymentModel = require("../models/moneyPaymentModel");
const dotenv = require("dotenv");
const validIdMongo = require("../utils/validMongoDB");
dotenv.config();

module.exports = {
  addGroup: async (req, res) => {
    try {
      const {userId} = req.params;
      validIdMongo(userId);

      const user = await FinanceUserModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { name_group, member} = req.body;

      const newGroup = await moneyPaymentModel.create({
        name_group,
        member,
      });

      console.log(newGroup);

      user.moneypayment.push(newGroup);
      await user.save();
      res.status(201).json(newGroup);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add addGroup" });
    }
  },
  
  updateMember: async (req, res) => {
    try {
      const { groupId, memberId, member_name } = req.body;

      validIdMongo(groupId);
      validIdMongo(memberId);

      const group = await moneyPaymentModel.findById(groupId);

      if (!group) {
        return res.status(404).json({ error: "User not found" });
      }

      const memberIndex = group.member.findIndex(
        (member) => member._id.toString() === memberId
      );

      if (memberIndex === -1) {
        return res.status(404).json({ error: "Member not found" });
      }
      group.member[memberIndex].member_name = member_name;

      group.pay_list.forEach((payment) => {
        if (payment.member_id === memberId) {
          payment.member_name = member_name;
        }
      });

      await group.save();
      res.status(200).json({ message: "Member updated successfulls"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update member" });
    }
  },

  addMember: async (req, res) => {
    try {
      const { groupId, member_name } = req.body;

      validIdMongo(groupId);

      const group = await moneyPaymentModel.findById(groupId);
      console.log(group)
      if (!group) {
        return res.status(404).json({ error: "User not found" });
      }

      const newMember = {
        member_name,
      };

      group.member.push(newMember);

      await group.save();
      res.status(201).json({ message: "Member added successfully", newMember });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add member" });
    }
  },

  deleteMember: async (req, res) => {
    try {
      const { groupId, memberId } = req.body;

      validIdMongo(groupId);
      validIdMongo(memberId);

      const group = await moneyPaymentModel.findById(groupId);

      if (!group) {
        return res.status(404).json({ error: "User not found" });
      }

      const memberIndex = group.member.findIndex(
        (member) => member._id.toString() === memberId
      );

      if (memberIndex === -1) {
        return res.status(404).json({ error: "Member not found" });
      }

      group.member.splice(memberIndex, 1);

      await group.save();
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete member" });
    }
  },
  addPayList: async (req, res) => {
    try {
      const { groupId, memberId, member_name, value, note } = req.body;
  
      validIdMongo(groupId);
  
      const group = await moneyPaymentModel.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
  
      // Check if member already exists in the pay list
      const existingMemberIndex = group.pay_list.findIndex(
        (payment) => payment.member_id === memberId
      );
  
      if (existingMemberIndex !== -1) {
        return res.status(400).json({ error: "Member already exists in pay list" });
      }
  
      const newPayment = {
        member_id: memberId,
        member_name,
        value: value || 0, // Set default value if not provided
        note: note || "_", // Set default note if not provided
      };
  
      group.pay_list.push(newPayment);
  
      await group.save();
      res.status(201).json({ message: "Payment added successfully", newPayment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add payment" });
    }
  },

  updatePayList: async (req, res) => {
    try {
      const { groupId, paylistId, member_id,member_name, value, note } = req.body;

      validIdMongo(groupId);
      validIdMongo(paylistId);

      const group = await moneyPaymentModel.findById(groupId);

      if (!group) {
        return res.status(404).json({ error: "User not found" });
      }

      const paylistIndex = group.pay_list.findIndex(
        (pay_list) => pay_list._id.toString() === paylistId
      );

      if (paylistIndex === -1) {
        return res.status(404).json({ error: "Member not found" });
      }
      group.pay_list[paylistIndex].member_id = member_id;
      group.pay_list[paylistIndex].member_name = member_name;
      group.pay_list[paylistIndex].value = value;
      group.pay_list[paylistIndex].note = note;

      await group.save();
      res.status(200).json({ message: "Member updated successfulls"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update member" });
    }
  },
  deletePaylist: async (req, res) => {
    try {
      const { groupId, paylistId } = req.body;

      validIdMongo(groupId);
      validIdMongo(paylistId);

      const group = await moneyPaymentModel.findById(groupId);

      if (!group) {
        return res.status(404).json({ error: "User not found" });
      }

      const paylistIndex = group.pay_list.findIndex(
        (pay_list) => pay_list._id.toString() === paylistId
      );

      if (paylistIndex === -1) {
        return res.status(404).json({ error: "Member not found" });
      }

      group.pay_list.splice(paylistIndex, 1);

      await group.save();
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete member" });
    }
  },


  deleteGroup: async (req, res) => {
    try {
      const { userId, groupId } = req.body;
      validIdMongo(userId);
      validIdMongo(groupId);
      const user = await FinanceUserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const groupIndex = user.moneypayment.findIndex(
        (moneypayment) => moneypayment._id.toString() === groupId
      );

      if (groupIndex === -1) {
        return res.status(404).json({ error: "Income not found" });
      }

      const deleteGroup = user.moneypayment.splice(groupIndex, 1)[0];
      await user.save();

      // Xoá group khỏi cơ sở dữ liệu
      await moneyPaymentModel.findByIdAndDelete(deleteGroup);

      res.status(200).json(deleteGroup);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete group" });
    }
  },

  calculateGroup: async (req, res) => {
    try {
      const { groupId } = req.params;
      validIdMongo(groupId);
      const group = await moneyPaymentModel.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: "group not found" });
      }
      
      console.log(group)

      res.status(200).json(group);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to calculate group" });
    }
  },

  
};
