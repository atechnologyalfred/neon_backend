import { register } from "../controller/register.js";
import { login } from "../controller/login.js";
import express from 'express';
import { dashboard } from "../controller/dashboard.js";
import { authorize } from "../authorize.js";
const router = express.Router();


router.post('/register', register)
router.get('/login', login)
router.get('/dashboard', authorize, dashboard)

export default router;