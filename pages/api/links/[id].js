import db from '@/database/connect'
import Links from "@/database/modals/linksModal"

// Liab
import AuthKey from '@/lib/AuthKey'

// 
export const config = {
    runtime: 'edge',
}

export default async function handler(req, res){
    AuthKey(req, res)
    const { id } = req.query

    if(req.method === 'GET'){
        await db.connect()
        const checkLinks = await Links.find({id: id})
        if(!checkLinks.length){
            res.status(404).json({error: 'Id Not Found'})
        }else{
            res.status(200).json(...checkLinks)
            await Links.findOneAndUpdate({id: id}, {
                $inc : {'clicked' : 1}
            })
        }
        await db.disconnect()
    }else if(req.method === 'DELETE'){
        await db.connect()
        const checkLinks = await Links.deleteOne({id: id})
        res.status(200).json(...checkLinks)
        await db.disconnect()
    }
    else{
        res.status(500).json({error: "This Request Isn't Allowed!"})
    }
}