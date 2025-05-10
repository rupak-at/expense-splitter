import { RequestHandler } from "express";
import { CustomRequest } from "../utils/types";
import { Group } from "../models/groupModels";
import { Expense } from "../models/expenseModels";
import mongoose from "mongoose";

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

        const formatedExp = await Expense.findById(expense._id).populate({
            path: "paidBy",
            select: "userName _id"
        });

        group.expenses.push(expense._id);
        await group.save();

        // emit socket event here like:
        // io.to(groupId).emit("new-expense", expense);

        res.status(201).json({ message: "Expense added", expense: formatedExp });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
        return
    }
};

const getExpenses: RequestHandler = async (req: CustomRequest, res) => {
    try {
        const userId = req.userId!;
        const groupId = req.params.id; 

        const groupExpenses = await Expense.find({group: groupId}).populate({
            path: "paidBy",
            select: "userName _id"
        });
        
        res.status(200).json({ groupExpenses });
        return
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
        return
    }
}
export { receiveExpense, getExpenses };
