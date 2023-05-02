import db from "@/database/connect"
import Links from "@/database/modals/linksModal"

import UUID from "@/lib/UUID"

export default async function handler(req, res){
  if(req.method === 'GET'){
    await db.connect()
    const checkLinks = await Links.find()
    await db.disconnect()
    res.status(200).json(checkLinks)
  }
  else if(req.method === 'POST'){
    const { originalLink } = req.body
    let generateId = UUID()
    
    const checkLinks = await Links.find({ id: generateId })
    if(!checkLinks.length){
      const newLink = {
        id: generateId,
        originalLink: originalLink ? originalLink : '/',
      }
      await db.connect()
      const postLink = await Links.create(newLink)
      await db.disconnect()
      res.status(201).json(postLink)
    }else{
      generateId = UUID()
      const newLink = {
        id: generateId,
        originalLink: originalLink,
      }
      await db.connect()
      const postLink = await Links.create(newLink)
      await db.disconnect()
      res.status(201).json(postLink)
    }
  }
}