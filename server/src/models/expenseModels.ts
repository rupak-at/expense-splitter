import mongoose from "mongoose";

interface IExpense {
    title: string;
    description: string;
    group: mongoose.Types.ObjectId;
    paidBy: mongoose.Types.ObjectId;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const expenseSchema: mongoose.Schema<IExpense> = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    group: {
        ref: "Group",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    paidBy: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export const Expense = mongoose.model<IExpense>("Expense", expenseSchema);