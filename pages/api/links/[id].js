import db from '@/database/connect'
import Links from "@/database/modals/linksModal"

// TODO: auth
export default async function handler(req, res){
    const { id } = req.query

    if(req.method === 'GET'){
        await db.connect()
        const checkLinks = await Links.find({id: id})
        await db.disconnect()
        
        if(!checkLinks.length){
            res.status(404).json({error: 'Id Not Found'})
        }else{
            res.status(200).json(...checkLinks)
        }
    }else if(req.method === 'DELETE'){
        await db.connect()
        const checkLinks = await Links.deleteOne({id: id})
        await db.disconnect()

        res.status(200).json(...checkLinks)
    }
}