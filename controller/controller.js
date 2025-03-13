import pg from 'pg';
import 'dotenv/config';

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
    res.send("working with just register route no http")
 
}

export const postUser = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {
        const data = await db.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',[userName, userEmail, userPassword] );
        res.status(200).json({data: data.rows});
        console.log(data.rows)
    } catch (err) {
        res.status(500).json({success: false, message:'server error'})
        console.log(err)
    }
    
}