import db from '@/database/connect'
import Links from "@/database/modals/linksModal"

// export const config = {
//     runtime: 'edge',
// }

export default async function handler(req, res){
    const { API_SECRET, id } = req.query
    if(API_SECRET !== process.env.API_SECRET){
        res.status(401).json({error: 'Unauthorized User!'})
    }

    if(req.method === 'GET'){
        await db.connect()
        const checkLinks = await Links.find({id: id})
        await db.disconnect()
        if(!checkLinks.length){
            res.status(404).json({error: 'Id Not Found'})
        }else{
            res.status(200).json(...checkLinks)
            await db.connect()
            await Links.findOneAndUpdate({id: id}, {
                $inc : {'clicked' : 1}
            })
            await db.disconnect()
        }
    }else if(req.method === 'DELETE'){
        await db.connect()
        const checkLinks = await Links.deleteOne({id: id})
        await db.disconnect()
        res.status(200).json(...checkLinks)
    }
    else{
        res.status(500).json({error: "This Request Isn't Allowed!"})
    }
}