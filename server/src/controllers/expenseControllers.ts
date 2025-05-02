import { RequestHandler } from "express";
import { CustomRequest } from "../utils/types";
import { Group } from "../models/groupModels";
import { Expense } from "../models/expenseModels";

const receiveExpense: RequestHandler = async (req: CustomRequest, res) => {
    try {
        const userId = req.userId!;
        const { groupId, title, description, amount } = req.body;

        const group = await Group.findById(groupId);

        if (!group) {
            res.status(404).json({ error: "Group not found" });
            return;
        }

        const isMember = group.members.some(memberId =>
            memberId.toString() === userId.toString()
        );

        if (!isMember) {
            res.status(401).json({ error: "Unauthorized: Not a group member" });
            return
        }

        const expense = await Expense.create({
            title,
            description,
            amount,
            paidBy: userId,
            group: groupId
        });

        group.expenses.push(expense._id);
        await group.save();

        // emit socket event here like:
        // io.to(groupId).emit("new-expense", expense);

        res.status(201).json({ message: "Expense added", expense });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
        return
    }
};

export { receiveExpense };
