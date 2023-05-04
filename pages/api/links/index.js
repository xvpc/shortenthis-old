import db from "@/database/connect"
import Links from "@/database/modals/linksModal"

// 
import UUID from "@/lib/UUID"

// Rate limit
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1000 s"),
  analytics: true,
})

export default async function handler(req, res){
  const identifier = "api";
  const result = await ratelimit.limit(identifier);
  res.setHeader('X-RateLimit-Limit', result.limit)
  res.setHeader('X-RateLimit-Remaining', result.remaining)
  if (!result.success) {
    res.status(429).json({message: 'The request has been rate limited.', rateLimitState: result})
    return
  }

  const { API_SECRET } = req.body
  if(API_SECRET !== process.env.API_SECRET){
    res.status(401).json({error: 'Unauthorized User!'})
  }
  
  if(req.method === 'GET'){
    await db.connect()
    const checkLinks = await Links.find()
    await db.disconnect()
    res.status(200).json(checkLinks)
  }
  else if(req.method === 'POST'){
    const { originalLink } = req.body
    if(!req.body) return res.status(404).json({error: 'No Data Was Giving'})
    let generateId = UUID()

    await db.connect()
    const checkLinks = await Links.find({ id: generateId })
    await db.disconnect()

    if(!checkLinks.length){
      const newLink = {
        id: generateId,
        originalLink: originalLink ? originalLink : '/',
        clicked: 0
      }
      await db.connect()
      const postLink = await Links.create(newLink)
      await db.disconnect()
      res.status(201).json(postLink)
    }else{
      generateId = UUID()
      const newLink = {
        id: generateId,
        originalLink: originalLink ? originalLink : '/',
        clicked: 0
      }
      await db.connect()
      const postLink = await Links.create(newLink)
      await db.disconnect()
      res.status(201).json(postLink)
    }
  }
  else{
    res.status(500).json({error: "This Request Isn't Allowed!"})
  }
}