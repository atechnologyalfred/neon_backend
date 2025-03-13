import { postUser, register } from "../controller/controller.js";
import express from 'express';
const router = express.Router();


router.get('/register', register)
router.post('/register', postUser)

export default router;