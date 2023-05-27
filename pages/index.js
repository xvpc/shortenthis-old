import React from "react";

// Components
import Layout from "@/Components/Layout";
import Home from "@/Components/Home";

// 
// export const config = {
//   runtime: 'experimental-edge',
// }

export default function Main({DA_SECRET}) {

  return(
    <Layout>
      <Home DA_SECRET={DA_SECRET} />
    </Layout>
  )
}
export async function getServerSideProps(){
  return {
      props: {
        DA_SECRET: process.env.API_SECRET
      }
    }
}
