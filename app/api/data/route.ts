'use server'

import { cookies } from "next/headers"
 
// import { cookies } from 'next/headers'
 
async function create() {
//   cookies().set('name', 'lee')
  // or
//   cookies().set('name', 'lee', { secure: true })
  // or
  cookies().set({
    name: 'foo',
    value: 'bar',
    httpOnly: true,
    path: '/',
    
  })
}



const data = {
    foo: {
        bar:'baz' ,
    } ,
}

export const GET = async (req:Request , res:Response) => {
    
    return new Response(JSON.stringify(data) , {
        status:201 ,
        statusText:'it s okay'
    })
}