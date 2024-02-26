import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; 
import { create,deletetim,updatetim, gettims } from '../controllers/tim.controller.js'  
const router = express.Router();
router.post('/create',verifyToken,create);
router.get('/gettims',gettims);
router.delete('/deletetim/:timId/:userId',verifyToken,deletetim);
router.put('/updatetim/:timId/:userId', verifyToken, updatetim)
export default router;