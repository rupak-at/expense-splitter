import mongoose from "mongoose";

interface IGroup extends mongoose.Document {
    groupName: string;
    members: mongoose.Types.ObjectId[];
    expenses: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const groupSchema: mongoose.Schema<IGroup> = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    members: [{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    }],
    expenses: [{
        ref: "Expense",
        type: mongoose.Schema.Types.ObjectId
    }],
    createdBy: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

export const Group = mongoose.model<IGroup>("Group", groupSchema);