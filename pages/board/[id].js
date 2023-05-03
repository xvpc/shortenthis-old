import React from "react";

// 
import axios from "axios";

// Components
import Layout from "@/Components/Layout";
import LinkDashboard from "@/Components/LinkDashboard";

export default function LinkBoard({ data }) {

    return(
        <Layout>
            <LinkDashboard data={data} />
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
