import pg from 'pg';
import 'dotenv/config';
import bcrypt from 'bcrypt'
import { jwtGenerator } from '../jwtGenerator.js';

    const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
    const db = new pg.Client({
        username: PGUSER,
        password: PGPASSWORD,
        host: PGHOST,
        database: PGDATABASE,
        ssl : {
            require: true
        }
    })
    db.connect()

export const register = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    
    try {
        const users = await db.query('SELECT * FROM users WHERE email = $1', [userEmail]);
        if(users.rows.length !==0) {
            res.status(401).json('user already exist');
            console.log(users.rows)
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(userPassword, salt)

        const newUser = await db.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',[userName, userEmail, bcryptPassword] );
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token})
        console.log(token)
        

    } catch (err) {
        res.status(500).json({success: false, message:'server error'})
        console.log(err)
    }
    
}