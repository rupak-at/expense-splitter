import mongoose from "mongoose";
import { Group } from "../models/groupModels";
import {Notification} from "../models/notificationModel"
import {NotificationData} from "./types"
export const saveNotification = async (data: NotificationData ,userIds: string[], groupId: string) => {
    try {
        const group = await Group.findById(groupId);

        if (!group) {
            console.error("Group not found");
            return;
        }
        const offlineGroupUsers = group.members.filter((mi) => userIds.includes(mi.toString()))

        const notificationPromises = offlineGroupUsers.map(async(userId) => {
            return await Notification.create({
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
            });
        });

        await Promise.all(notificationPromises);
        return
        
    } catch (error) {
        console.error("Error saving notification:", error);
        return
    }
}