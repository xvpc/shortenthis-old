import db from "@/database/connect"
import Links from "@/database/modals/linksModal"

// Liab
import UUID from "@/lib/UUID"
import AuthKey from "@/lib/AuthKey";

// 
// export const config = {
//   runtime: 'edge',
// }

// Rate limit
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(15, "500 s"),
  analytics: true,
})

export default async function handler(req, res){
  AuthKey(req, res)

  // 
  const identifier = "api";
  const result = await ratelimit.limit(identifier);
  res.setHeader('X-RateLimit-Limit', result.limit)
  res.setHeader('X-RateLimit-Remaining', result.remaining)
  if (!result.success) {
    res.status(429).json({message: 'The request has been rate limited.', rateLimitState: result})
    return
  }

  
  if(req.method === 'GET'){
    await db.connect()
    const checkLinks = await Links.find()
    res.status(200).json(checkLinks)
    await db.disconnect()
  }
  else if(req.method === 'POST'){
    const { originalLink } = req.body
    if(!req.body) return res.status(404).json({error: 'No Data Was Giving'})
    let generateId = UUID()

    await db.connect()
    const checkLinks = await Links.find({ id: generateId })

    if(!checkLinks.length){
      const newLink = {
        id: generateId,
        originalLink: originalLink ? originalLink : '/',
        clicked: 0
      }
      const postLink = await Links.create(newLink)
      res.status(201).json(postLink)
    }else{
      generateId = UUID()
      const newLink = {
        id: generateId,
        originalLink: originalLink ? originalLink : '/',
        clicked: 0
      }
      const postLink = await Links.create(newLink)
      res.status(201).json(postLink)
    }
    await db.disconnect()
  }
  else{
    res.status(500).json({error: "This Request Isn't Allowed!"})
  }
}