import db from "@/database/connect"
import Links from "@/database/modals/linksModal"
import UUID from "@/lib/UUID"

export default async function handler(req, res){
  if(req.method === 'GET'){
    // res.status(200).json(links)
    await db.connect()
    const checkLinks = await Links.find()
    await db.disconnect()
    res.status(200).json(checkLinks)
  }
  else if(req.method === 'POST'){
    const { originalLink } = req.body
    //TODO: UUID
    let generateId = UUID()
    
    const checkLinks = await Links.find({ id: generateId })
    if(checkLinks.length){
      generateId = UUID()
    }else{
      const newLink = {
        id: generateId,
        originalLink: originalLink,
        shortLike: `http://localhost:3000/${generateId}`,
      }
      await db.connect()
      const postLink = await Links.create(newLink)
      await db.disconnect()
      res.status(201).json(postLink)
    }
  }
}