import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

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

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const [updatedMovies, setUpdatedMovies] = useState(movies);

  useEffect(() => {
    Promise.all(movies.map((movie: any) => fetchMovie(movie.videoID))) 
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
  const scienceFiction = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Science Fiction")
  );
  const horror = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Horror")
  );
  const mystery = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Mystery")
  );
  const HollywoodMovies = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.origin_country?.includes("US") &&
      movie.genres?.some((genre: Genre) => genre.name !== "Animation")
  );
  const romance = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Romance")
  );
  const epicAdventures = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Adventure")
  );
  const comedy = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Comedy")
  );
  const heartwarmingStories = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Drama")
  );
  const thrillers = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Thriller")
  );
  const documentaries = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Documentary")
  );
  const familyFun = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Family")
  );
  const classicHits = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date && parseInt(movie.release_date.split("-")[0]) < 2000
  );
  const internationalCinema = updatedMovies.filter((movie: MovieInterface) =>
    movie.origin_country && movie.origin_country.length > 1
  );


  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <ViewModal visible={ViewModalopen} onClose={closeViewModal} />
      <Navbar />
      
      <div className="w-full h-auto flex flex-col gap-2 pb-16 overflow-hidden">
        <DisplayRandom data={updatedMovies} title={""} />
        <MovieList title="Suggestions for you" data={updatedMovies} />
        <MovieList title="Anime Adventures" data={anime} />
        <MovieList title="Fresh Arrivals" data={newReleases} />
        <MovieList title="Mind-Bending Sci-Fi" data={scienceFiction} />
        <MovieList title="Spine-Chilling Horror" data={horror} />
        <MovieList title="Unsolved Mysteries" data={mystery} />
        <MovieList title="Hollywood Hits" data={HollywoodMovies} />
        <MovieList title="Romantic Escapes" data={romance} />
        <MovieList title="Epic Adventures" data={epicAdventures} />
        <MovieList title="Laugh Out Loud" data={comedy} />
        <MovieList title="Heartwarming Stories" data={heartwarmingStories} />
        <MovieList title="Edge of Your Seat Thrillers" data={thrillers} />
        <MovieList title="Documentary Spotlight" data={documentaries} />
        <MovieList title="Family Fun" data={familyFun} />
        <MovieList title="Classic Hits" data={classicHits} />
        <MovieList title="International Cinema" data={internationalCinema} />
      </div>
    </>
  );
};

export default Home;
