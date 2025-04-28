import { RequestHandler } from "express";
import { Group } from "../models/groupModels";
import { CustomRequest } from "../middleware/verifyLogin";

const makeGroup: RequestHandler = async(req: CustomRequest, res) => {
    try {
        const {groupName, userIds} = req.body;

        const group = await Group.create({
            groupName,
            members: userIds,
            createdBy: req.userId
        })

        res.status(201).json(group);
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({error: (error as Error).message});
        return;
    }
}

const addMemberToGroup: RequestHandler = async(req: CustomRequest, res) => {
    try {
        
        const {id} = req.params;
        const {userIds} = req.body;

        const group = await Group.findById(id);

        if (group?.createdBy.toString() !== req.userId?.toString()) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        if (!group) {
            res.status(404).json({error: "Group not found"});
            return;
        }

        group.members.push(...userIds);
        await group.save();

        res.status(200).json({group, message: "Group updated"});
        return
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: (error as Error).message});
        return;
    }
}

export {makeGroup, addMemberToGroup}