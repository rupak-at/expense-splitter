import { RequestHandler } from "express";
import { CustomRequest } from "../utils/types";
import { Group } from "../models/groupModels";
import { splitLogic } from "../utils/splitLogic";

const getSplit:RequestHandler = async(req:CustomRequest, res) =>{
    try {
        const groupId = req.params.id;
        
        const group = await Group.findById(groupId).populate({
            path: "expenses",
            select: "title description amount paidBy _id, group",
            populate: {
                path: "paidBy",
                select: "userName _id"
            }
        })
        .populate({
            path: "members",
            select: "userName _id"
        })

        if (!group) {
            res.status(404).json({error: "Group not found"});
            return;
        }

        const transactions = splitLogic(group.expenses, group.members);

        res.status(200).json({transactions});
        return

    } catch (error) {
     console.error(error)
     res.status(500).json({error:(error as Error).message  });
     return   
    }
}

export {getSplit}