import express, { Request, Response } from 'express';
import { userContainer } from "../containers/user.container.js";
import { UserRepository } from "../repository/UserRepository.js";
// import amqplib, { Channel, Connection } from 'amqplib'

const router = express.Router();
// let channel: Channel, connection: Connection

router.post('/createUser', async (req: Request, res: Response) => {
    const data = req.body
    try {
        const userRep = userContainer.get(UserRepository)
        const result = await userRep.createUser(data)
        return res.status(200).json({ success: true, data: result })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

router.get('/getUsersList/:page', async (req: Request, res: Response) => {
    try {
        const page = Number(req.params.page)
        const userRep = userContainer.get(UserRepository)
        const users = await userRep.getUsersList(page)
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching todos", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
})
router.put('/updateUserData/:id', async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.id)
        const data = req.body
        const userRep = userContainer.get(UserRepository)
        const result = await userRep.updateUserData(user_id, data)
        res.status(200).json({ success: true, data: result })
    }
    catch (error) {
        console.error("Error fetching todos", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
})

router.get('/', (req, res) => {
    res.json({ data: 'Main page' })
})




export default router