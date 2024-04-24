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

const Time = () => {
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

  const _2024Releases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2024")
  );
  const _2023Releases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2023")
  );
  const _2022Releases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2022")
  );
  const _2021Releases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2021")
  );
  const _2020Releases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2020")
  );
  const _2019Releases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2019")
  );


  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <ViewModal visible={ViewModalopen} onClose={closeViewModal} />
      <Navbar />
      
      <div className="w-full h-auto flex flex-col gap-2 pt-[100px]">
        <MovieList title="New on Netflex" data={_2024Releases} />
        <MovieList title="2024 Release" data={_2024Releases} />
        <MovieList title="2023 Release" data={_2023Releases} />
        <MovieList title="2022 Release" data={_2022Releases} />
        <MovieList title="2021 Release" data={_2021Releases} />
        <MovieList title="2020 Release" data={_2020Releases} />
        <MovieList title="2019 Release" data={_2019Releases} />
        <MovieList title="Coming this week" data={_2024Releases} />
      </div>
    </>
  );
};

export default Time;
