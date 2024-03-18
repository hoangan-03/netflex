import React from 'react'
import { NextPageContext } from "next";
import profile from "../assets/icon/profile.jpg"
import { getSession } from "next-auth/react";
import Image from 'next/image';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
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
    const router = useRouter();
    const {data: user} = useCurrentUser();
  return (
    <div className='w-[50%] h-[30%] flex netflix text-bold flex-col justify-center gap-10 items-center absolute top-[25%] left-[25%]'>
        
        <p className='text-white text-6xl'>Who's watching?</p>
        <div className='w-full h-auto flex gap-8 flex-row justify-center items-center'>
            <div className='w-1/5 h-full flex flex-col gap-4 '>
                <Image src ={profile} alt =''className='w-full h-auto aspect-square bg-black rounded-lg cursor-pointer hover:border-4 border-white ' onClick={() => router.push('/')}></Image>
                <p className='text-2xl text-gray-400 w-auto text-center'>{user?.name}</p>
            </div>
            
        </div>
    </div>
  )
}

export default profiles