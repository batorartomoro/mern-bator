import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; 
import { create,getprojects,deleteproject,updateproject } from '../controllers/project.controller.js'  
const router = express.Router();
router.post('/create',verifyToken,create);
router.get('/getprojects',getprojects);
router.delete('/deleteproject/:projectId/:userId',verifyToken,deleteproject);
router.put('/updateproject/:projectId/:userId', verifyToken, updateproject)
export default router;