import { Router } from 'express';
import {Createuser, loginUser,logoutUser} from '../controller/authController.js'

const router = Router();

// Prefix: /auth
router.post('/register', Createuser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
