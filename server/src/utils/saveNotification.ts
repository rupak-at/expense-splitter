import mongoose from "mongoose";
import { Group } from "../models/groupModels";
import {Notification} from "../models/notificationModel"
import {NotificationData} from "./types"
export const saveNotification = async (data: NotificationData ,userId: string, groupId: string) => {
    try {
        const group = await Group.findById(groupId);

        if (!group) {
            console.error("Group not found");
            return;
        }
        if (!group.members.includes(new mongoose.Types.ObjectId(userId))) {
            console.error("User is not a member of the group");
            return;
        }
        await Notification.create({
            title: data.title,
            description: data.description,
            group: data.group,
            expense: data._id,
            amount: data.amount,
            paidBy: {
                _id: data.paidBy._id,
                userName: data.paidBy.userName
            },
            user: userId
        })
        return
        
    } catch (error) {
        console.error("Error saving notification:", error);
        return
    }
}