import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import DisplayRandom from "@/components/DisplayRandom";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import ViewModal from "@/components/ViewModal";

import useInfoModalStore from "@/hooks/useInfoStore";
import useMovieList from "@/hooks/useMovieList";
import { fetchMovie } from "../api/film";
import { useState, useEffect } from "react";
import { MovieInterface, Genre } from "../types";
import useViewStore from "@/hooks/useViewStore";

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
      .then((dataa) => {
        const newMovies = movies.map((movie: any) => {
          const matchingData = dataa.find((d) => d.id == movie.videoID);
          return matchingData ? { ...movie, ...matchingData } : movie;
        });
        setUpdatedMovies(newMovies);
      })
      .catch((error) => console.error(error));
  }, [movies]);
  const { isOpen, closeModal } = useInfoModalStore();
  const { ViewModalopen, closeViewModal } = useViewStore();
  const anime = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.genres?.some((genre: Genre) => genre.name === "Animation") &&
      movie.original_language === "ja"
  );
  const newReleases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2024")
  );
  const scienceFiction = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.genres?.some((genre: Genre) => genre.name === "Science Fiction") 
  );
  const horror = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.genres?.some((genre: Genre) => genre.name === "Horror") 
  );
  const HollywoodMovies = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.origin_country?.includes("US") && movie.genres?.some((genre: Genre) => genre.name !== "Animation")
  );
  const romance = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.genres?.some((genre: Genre) => genre.name === "Romance") 
  );

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <ViewModal visible={ViewModalopen} onClose={closeViewModal} />
      <Navbar />
      
      <div className="w-full h-auto flex flex-col gap-2">
        <DisplayRandom data={updatedMovies} />
        <MovieList title="Suggestions for you" data={updatedMovies} />
        <MovieList title="Anime" data={anime} />
        <MovieList title="New Releases" data={newReleases} />
        <MovieList title="Science-Fiction" data={scienceFiction} />
        <MovieList title="Horror" data={horror} />
        <MovieList title="Hollywood Movies" data={HollywoodMovies} />
        <MovieList title="Romantic Drama" data={romance} />
      </div>
    </>
  );
};

export default Home;
