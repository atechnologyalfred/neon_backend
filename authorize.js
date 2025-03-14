import jwt from 'jsonwebtoken';
import 'dotenv/config';
export const authorize =  ( req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if(!jwtToken) {
            return res.status(403).json('not Authorize')
        }
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
       return req.user = payload.user
    } catch (err) {
        console.error(err.message)
        return res.status(500).json('server crashed unexpectedly');
    }
 
}