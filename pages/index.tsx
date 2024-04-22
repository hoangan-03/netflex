import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import DisplayRandom from "@/components/DisplayRandom";
import MovieList from "@/components/MovieList";
import Suggestion from "@/components/Suggestion";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoStore";
import useMovieList from "@/hooks/useMovieList";
import { fetchMovie } from '../api/film';
import { useState,useEffect } from "react";
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
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const [updatedMovies, setUpdatedMovies] = useState(movies);

  useEffect(() => {
    Promise.all(movies.map((movie: any) => fetchMovie(movie.videoID))) // Add type annotation to 'movie' parameter
      .then(dataa => {
        const newMovies = movies.map((movie: any) => {
          const matchingData = dataa.find(d => d.id == movie.videoID);
          return matchingData ? { ...movie, ...matchingData } : movie;
        });
        setUpdatedMovies(newMovies);
      })
      .catch(error => console.error(error));
  }, [movies]);
  const { isOpen, closeModal } = useInfoModalStore();

  console.log("update",updatedMovies)
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="w-full h-auto flex flex-col gap-10">
        <DisplayRandom data={updatedMovies}/>
        <Suggestion title="Suggestion for you" data={updatedMovies} />
        <MovieList />
      </div>
    </>
  );
};

export default Home;
