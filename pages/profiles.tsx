import React from 'react'
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }
const profiles = () => {
  return (
    <div className='w-[50%] h-[30%] flex flex-col bg-blue-100 justify-center items-center absolute top-[30%] left-[25%]'>
        
        <p className='text-white airbnb text-6xl'>Whos watching</p>
    </div>
  )
}

export default profiles