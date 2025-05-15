import { RequestHandler } from "express";
import { Notification } from "../models/notificationModel";

const getNotification:RequestHandler = async (req, res) => {
    try {
        const {id} = req.params;
    
        const notifications = await Notification.find({$and: [{user: id}, {read: false}]}).sort({createdAt: -1});
    
        if (notifications.length === 0) {
            res.status(404).json({error: "Notifications not found"});
            return;
        }
        notifications.forEach((notification) => {
            notification.read = true;
            notification.save();
        })
        res.status(200).json({notifications});
        return
    } catch (error) {
        console.error(error)
        res.status(500).json({error: (error as Error).message});
        return
    }
}

export {getNotification}