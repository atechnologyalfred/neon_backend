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

export const login = async ( req, res ) => {
    const { userEmail, userPassword } = req.body;
    try  {
        const user = await db.query('SELECT * FROM users WHERE email=$1', [userEmail])
        if(user.rows.length === 0) {
            res.status(401).json('wrong email or password')
        }
    const validPassword = await bcrypt.compare(userPassword, user.rows[0].password)
    const token = jwtGenerator(user.rows[0].user_id)
    res.json({token})
    console.log(token)

    } catch (err) {
        console.log(err)
        res.status(500).json('server error')
    }
}