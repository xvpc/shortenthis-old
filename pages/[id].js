import React, { useEffect, useState } from "react";

// 
import { useRouter } from "next/router";

// 
import axios from "axios";

// Components
import Layout from "@/Components/Layout";

// Others
// import links from '@/data/links.json'

export default function Testing({ link }) {
    const router = useRouter()
    // useEffect(() => {
    //     // router.replace(link.originalLink)
    //     console.log(link)
    // }, [])

    return(
        <Layout>
            <div>
                <h1>Testing page!</h1>
                <div>Like is: {link.originalLink || 'none giving'}</div>
            </div>
        </Layout>
    )
}
export async function getServerSideProps(context){
    const { id } = context.query
    const queryId = String(id)

    if(queryId && typeof queryId === 'string'){
        try{
            const req = await axios.get(process.env.API_URL + '/' + queryId)
            console.log('req from getServerSideProps =>', req.data)
            if(req?.data && req.data.length){
                return{
                    props: {
                        link,
                    }
                }
            }
        }catch(err){
            console.log('error message =>', err.message)
            return{
                notFound: true
            }
        }
    }else{
        return{
            notFound: true
        }
    }
    
    
}
