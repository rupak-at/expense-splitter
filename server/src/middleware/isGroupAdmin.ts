import { RequestHandler } from "express";
import { CustomRequest } from "../utils/types";
import { Group } from "../models/groupModels";

export const isGroupAdmin:RequestHandler = async (req:CustomRequest, res, next) => {
    try {
        const groupId = req.params.id;
        const userId = req.userId;
        
        const group = await Group.findById(groupId);

        if(!group) {
            res.status(404).json({error: "Group not found"});
            return;
        }

        if (group.createdBy.toString() !== userId?.toString()) {
            res.status(401).json({error: "Unauthorized"});
            return;        
        }

        next();
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:(error as Error).message  });
        return
    }
}