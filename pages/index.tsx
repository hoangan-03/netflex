import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import DisplayRandom from "@/components/DisplayRandom";
import MovieList from "@/components/MovieList";
import Suggestion from "@/components/Suggestion";
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from "@/hooks/useInfoStore";
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

const Home = () => {
  const {data: user}= useCurrentUser();
  const {isOpen, closeModal} = useInfoModalStore();
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}  />
    <Navbar />
    <div className="w-full h-auto flex flex-col gap-10">
    <DisplayRandom />

    
    <Suggestion />
    <MovieList />
    </div>
    

    </>
  );
};

export default Home;
