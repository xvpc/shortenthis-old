import React, { useEffect, useState } from "react";

// 
import { useRouter } from "next/router";

// 
import axios from "axios";

// Components
import Layout from "@/Components/Layout";

// Others
// import links from '@/data/links.json'

export default function Testing({ data }) {
    const router = useRouter()
    // useEffect(() => {
    //     // router.replace('/')
    //     console.log(data)
    // }, [])

    return(
        <Layout>
            <div>
                <h1>Testing page!</h1>
                <div>Like is: {data?.originalLink || 'none giving'}</div>
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
            if(req?.data){
                return{
                    props: {
                        data: req.data,
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
