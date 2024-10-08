import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMovieList";
import { MovieInterface } from "../types";
import { fetchMovie, fetchCast } from "@/api/film";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  CurrencyDollarIcon,
  StarIcon,
  Bars2Icon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";



const getRandomMovies = (movies: MovieInterface[], count: number) => {
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};



const formatRevenue = (revenue: number) => {
  if (revenue >= 1_000_000_000) {
    return (revenue / 1_000_000_000).toFixed(1) + "B";
  } else if (revenue >= 1_000_000) {
    return (revenue / 1_000_000).toFixed(1) + "M";
  } else if (revenue >= 1_000) {
    return (revenue / 1_000).toFixed(1) + "K";
  } else {
    return revenue.toString();
  }
};

const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const seconds = Math.floor(Math.random() * 60); // Generate random seconds
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const Random = () => {
  const [movieCount, setMovieCount] = useState(10);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setMovieCount(5);
    } else {
      setMovieCount(10); 
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  return () => window.removeEventListener("resize", handleResize);
}, []);

  const { data: movies = [] } = useMovieList();
  const [updatedMovies, setUpdatedMovies] = useState(movies);
  const [randomMovies, setRandomMovies] = useState<MovieInterface[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieInterface | null>(null);
  const [hoveredMovie, setHoveredMovie] = useState<MovieInterface | null>(null);
  const router = useRouter();

  const [isZoomingIn, setIsZoomingIn] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ top: 0, left: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

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

useEffect(() => {
  if (updatedMovies.length > 0) {
    setRandomMovies(getRandomMovies(updatedMovies, movieCount));
  }
}, [updatedMovies, movieCount]);


  const handleMovieClick = (movie: MovieInterface, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setInitialPosition({ top: rect.top, left: rect.left });
    setIsZoomingIn(true);
    setSelectedMovie(movie);
    setTimeout(() => {
      setIsFullScreen(true);
    }, 200);
  };

  const [castData, setCast] = useState<any>(null);
  useEffect(() => {
    if (selectedMovie?.id) {
      fetchCast(selectedMovie.id)
        .then((data) => setCast(data))
        .catch((error) => console.error(error));
    }
  }, [selectedMovie]);

  const handleBackClick = () => {
    setIsZoomingIn(false);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 200);
  };

  const handleShuffleClick = () => {
    console.log("Shuffle button clicked");
    setRandomMovies(getRandomMovies(updatedMovies, movieCount));
  };

  return (
    <>
      <Navbar />
      <div
        className={`w-screen h-screen bg-black relative overflow-hidden ${
          isZoomingIn ? "zoom-in" : "zoom-out"
        } ${hoveredMovie ? "hovering" : ""}`}
      >
        <div className="absolute top-20 left-[50%] transform -translate-x-1/2 flex justify-center items-center">
          <h2 className="text-white text-2xl font-bold">
            {hoveredMovie?.title}
          </h2>
        </div>
        <button onClick={handleShuffleClick} className="cursor-pointer absolute z-[9] bottom-10 left-1/2 transform -translate-x-1/2 w-auto h-auto px-3 bg-white rounded-lg flex items-center justify-center text-2xl font-bold">
          <ArrowsRightLeftIcon className="h-8 w-8 text-black" />
        </button>
        <div
          className={`absolute inset-0 px-6 xl:px-[200px] py-[150px] transition-transform duration-1000 flex flex-row gap-3 ${
            isZoomingIn ? "zoom-in" : ""
          }`}
        >
          {randomMovies.map((movie) => (
            <div
              key={movie.id}
              className={`${
                selectedMovie && selectedMovie.id === movie.id
                  ? "absolute"
                  : "flex hover:scale-110 cursor-pointer"
              } bg-cover bg-center transition-all duration-400 hover:z-10 z-[5] ${
                selectedMovie && selectedMovie.id === movie.id
                  ? " selected"
                  : ""
              } ${
                hoveredMovie && hoveredMovie.id !== movie.id ? "filtered" : ""
              }`}
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                width:
                  selectedMovie && selectedMovie.id === movie.id
                    ? "100vw"
                    : "20vw",
                height:
                  selectedMovie && selectedMovie.id === movie.id
                    ? "100vh"
                    : "70vh",
                top:
                  selectedMovie && selectedMovie.id === movie.id
                    ? isFullScreen
                      ? 0
                      : initialPosition.top
                    : "auto",
                left:
                  selectedMovie && selectedMovie.id === movie.id
                    ? isFullScreen
                      ? 0
                      : initialPosition.left
                    : "auto",
                zIndex:
                  selectedMovie && selectedMovie.id === movie.id ? 10 : "auto",
                transition:
                  selectedMovie && selectedMovie.id === movie.id
                    ? "all 1s ease-in-out"
                    : "all 0.5s ease-in-out",
              }}
              onClick={(event) => handleMovieClick(movie, event)}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {selectedMovie && selectedMovie.id === movie.id && (
                <div className="inset-0 h-screen w-screen flex flex-row justify-between relative">
                  <div className="flex flex-col bg-black/10 justify-between  md:px-[100px] px-5 pt-[150px] pb-[50px] h-full w-[40vw] items-start ">
                    <div>
                      <h2 className="text-white text-lg md:text-xl font-bold">
                        {castData?.cast[0].name} | {castData?.cast[1].name} |{" "}
                        {castData?.cast[2].name} | {castData?.cast[3].name}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4 justify-start items-center">
                      <div className="flex w-full flex-row gap-4 items-center justify-start">
                        <div className="w-8 h-8 p-1 rounded-full flex items-center justify-center border-white border-[1px]">
                          <VisibilityIcon />
                        </div>
                        <h2 className="text-lg font-bold text-white">
                          {selectedMovie.popularity}
                        </h2>
                      </div>
                      <div className="flex w-full flex-row gap-4 items-center justify-start">
                        <div className="w-8 h-8 p-1 rounded-full flex items-center justify-center border-white border-[1px]">
                          <StarIcon />
                        </div>
                        <h2 className="text-lg font-bold text-white">
                          {selectedMovie.vote_average.toFixed(1)}
                        </h2>
                      </div>
                      <div className="flex w-full flex-row gap-4 items-center justify-start">
                        <div className="w-8 h-8 p-1 rounded-full flex items-center justify-center border-white border-[1px]">
                          <CurrencyDollarIcon />
                        </div>
                        <h2 className="text-lg font-bold text-white">
                          {formatRevenue(selectedMovie.revenue)}
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-row gap-3">
                        <div className="bg-white rounded-3xl py-1 md:py-1 px-3 md:px-4 w-auto text-xs lg:text-base  font-semibold flex flex-row items-center hover:bg-neutral-300  transition text-black ">
                          {selectedMovie.genres[0].name}
                        </div>
                        <div className="bg-white rounded-3xl py-1 md:py-1 px-3 md:px-4 w-auto text-xs lg:text-base  font-semibold flex flex-row items-center hover:bg-neutral-300  transition text-black ">
                          {selectedMovie.genres[1].name}
                        </div>
                      </div>
                      <div className="w-full flex flex-row gap-10 items-start ">
                        <h2 className="text-white font-extrabold text-3xl md:text-4xl mb-4">
                          {selectedMovie.title}
                        </h2>
                        <div className="flex flex-col">
                          <p className="text-gray-200 font-normal text-lg">
                            year
                          </p>
                          <p className="text-white text-2xl font-bold">
                            {selectedMovie.release_date.substring(0, 4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between px-5 md:px-[100px] py-0 md:py-[50px] h-full w-[35vw] items-end ">
                    <div></div>
                    <div className="flex flex-col gap-4 justify-start items-center">
                      <h1 className="text-white text-xl md:text-3xl mt-5 md:mt-0 w-auto font-extrabold backdrop-blur-sm p-2 rounded-2xl bg-black/10">
                        {selectedMovie.tagline
                          ? `"${selectedMovie.tagline}"`
                          : selectedMovie.tagline}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-1 w-[80%] bg-black/20 rounded-2xl border-white justify-center border-[1px] py-2 px-4">
                      <div className="flex flex-row justify-end">
                        <h2 className="self-end w-auto text-gray-200 text-sm">
                          {selectedMovie &&
                            formatRuntime(selectedMovie.runtime)}
                        </h2>
                      </div>
                      <div className="relative w-full h-1 bg-gray-700 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full bg-white rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute inset-0 m-auto w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl font-bold"
                    onClick={() => router.push(`/watch/${selectedMovie.id}`)}
                  >
                    <PlayIcon
                      className="w-8 h-8 text-sky-700 ml-1"
                      style={{ opacity: 0.5 }}
                    />
                  </button>
                  <button
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-auto h-auto px-2 bg-white rounded-lg flex items-center justify-center text-2xl font-bold"
                    onClick={handleBackClick}
                  >
                    <Bars2Icon className="h-8 w-8 text-black" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Random;