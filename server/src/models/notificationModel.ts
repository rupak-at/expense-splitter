import mongoose, { model, Schema } from "mongoose";


interface INotification extends mongoose.Document {
    title: string;
    description: string;
    group: mongoose.Types.ObjectId;
    expense: mongoose.Types.ObjectId;
    amount: number;
    paidBy: {
        _id: mongoose.Types.ObjectId;
        userName: string;
    };
    user: mongoose.Types.ObjectId;
    read: boolean
}

const notificationSchema: mongoose.Schema<INotification> = new Schema({
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
        type: Schema.Types.ObjectId,
        required: true
    },
    expense : {
        ref: "Expense",
        type: Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        reqiured: true
    },
    paidBy:{
        _id: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        userName: {
            type: String,
            required: true
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

export const Notification = model<INotification>("Notification", notificationSchema);