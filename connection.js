import pg from 'pg';
import 'dotenv/config';

export const connection = () => {
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
}
