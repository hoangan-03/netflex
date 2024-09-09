import React from "react";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import ViewModal from "@/components/ViewModal";
import useInfoModalStore from "@/hooks/useInfoStore";
import useMovieList from "@/hooks/useMovieList";
import { fetchMovie } from "../api/film";
import { useState, useEffect } from "react";
import { MovieInterface } from "../types";
import useViewStore from "@/hooks/useViewStore";

const Time = () => {
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
  const releaseYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const releasesByYear = releaseYears.reduce((acc, year) => {
    acc[`_${year}Releases`] = updatedMovies.filter((movie: MovieInterface) =>
      movie.release_date?.includes(year)
    );
    return acc;
  }, {} as { [key: string]: MovieInterface[] });
  const topFilms = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.vote_average >= 8.2 && movie.vote_count >= 7000
  );
  const blockBusters = updatedMovies.filter(
    (movie: MovieInterface) => movie.revenue >= 800000000
  );
  const {
    _2024Releases, _2023Releases, _2022Releases, _2021Releases, _2020Releases,_2019Releases, _2018Releases,
  } = releasesByYear;
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <ViewModal visible={ViewModalopen} onClose={closeViewModal} />
      <Navbar />
      <div className="w-full h-auto flex flex-col gap-2 pt-[100px]">
        <MovieList title="Best of Bests" data={topFilms} />
        <MovieList title="Blockbusters" data={blockBusters} />
        <MovieList title="New on Netflex" data={_2024Releases} />
        <MovieList title="2023 Release" data={_2023Releases} />
        <MovieList title="2022 Release" data={_2022Releases} />
        <MovieList title="2021 Release" data={_2021Releases} />
        <MovieList title="2020 Release" data={_2020Releases} />
        <MovieList title="2019 Release" data={_2019Releases} />
        <MovieList title="2018 Release" data={_2018Releases} />
        <MovieList title="Coming this week" data={_2024Releases} />
      </div>
    </>
  );
};

export default Time;
