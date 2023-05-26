export default function AuthKey(req, res) {
    const apiAuth = req.headers?.authorization

    // TODO: Edit this
    if(process.env.NODE_ENV !== 'production'){
        if(apiAuth !== process.env.API_SECRET){
            return res.status(401).json({error: "You're Unauthorized to see this information!"})
        }
    }
}