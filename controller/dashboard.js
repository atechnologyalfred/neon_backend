
export const dashboard  =  (req, res)=> {
    try {
        res.json(req.user)
    } catch (err) {
        console.log(err)
        res.status(500).json('server error')
    }
}