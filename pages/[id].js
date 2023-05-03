import React, { useEffect, useState } from "react";

// 
import { useRouter } from "next/router";

// 
import axios from "axios";

// Components
import Layout from "@/Components/Layout";

export default function RedirectingPage({ data }) {
    const [count, setCount] = useState(7)
    const [error, setError] = useState('')
    const router = useRouter()
    useEffect(() => {
        if(data && data.originalLink){
            router.replace(data.originalLink)
        }else{
            setError('Something went wrong!')
        }
    }, [])

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            setCount(prev => prev - 1)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    return(
        <Layout>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                {!error ? 
                <>
                    <h1 className="fw-bolder">Redirecting</h1>
                    <span className="fw-bold fs-5">{count >= 0 ? count : '...'}</span>
                </> : 
                <p className='p-0 m-0 text-danger'>{error}</p>
                }
                <div className="d-flex flex-row text-center gap-2 text-primary"><span className="fw-bold text-black">Link is:</span> {data?.originalLink || 'none giving'}</div>
            </div>
        </Layout>
    )
}
export async function getServerSideProps(context){
    const { id } = context.query
    const queryId = String(id)
    
    if(queryId && typeof queryId === 'string'){
        const url = process.env.API_URL + '/' + queryId
        try{
            const req = await axios(url, {
                params: {
                    API_SECRET: process.env.API_SECRET
                },
            })
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
