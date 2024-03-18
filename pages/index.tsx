import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

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
  return (
    <div className="bg-black w-screen h-auto">
      <p className="text-white text-4xl">Login as: {user?.email}</p>
      <button
        className="h-10 w-full bg-white text-black"
        onClick={() => signOut()}
      >Sign out</button>
    </div>
  );
};

export default Home;
