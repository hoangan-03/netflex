/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { PlusIcon, XMarkIcon, CheckIcon, PlayIcon } from "@heroicons/react/24/outline";
import useSeriesInfoStore from "@/hooks/useSeriesInfoStore";
import {fetchSeason, fetchSeries,fetchSeriesCast } from "@/api/film";
import { SeriesInfoModalProps } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";

const SeriesInfoModal = ({ visible, onClose }: SeriesInfoModalProps) => {
  const [castData, setCast] = useState<any>(null);
  const [isVisible, setIsVisible] = useState<boolean>(visible ? true : false);
  const { seriesInfo } = useSeriesInfoStore();
  const [user, setUser] = useState<any>(null);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleFetchEpisodes = async (seasonNumber: number) => {
    if (seriesInfo?.id) {
      try {
        const episodesData = await fetchSeason(String(seriesInfo?.id), seasonNumber);
        setEpisodes(episodesData.episodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    }
  };

  useEffect(() => {
    if (seriesInfo?.id) {
      fetchSeriesCast(String(seriesInfo?.id))
        .then((data) => setCast(data))
        .catch((error) => console.error(error));

      fetchSeries(String(seriesInfo?.id))
        .then((seriesData) => {
          const totalSeasons = seriesData.number_of_seasons;
          const seasonPromises = [];

          for (let i = 1; i <= totalSeasons; i++) {
            seasonPromises.push(fetchSeason(String(seriesInfo?.id), i));
          }

          return Promise.all(seasonPromises);
        })
        .then((seasonsData) => {
          setSeasons(seasonsData);
          handleFetchEpisodes(1);
        })
        .catch((error) => console.error(error));
    }
  }, [seriesInfo]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios
          .get(`/api/getwishlist?userId=${parsedUser.userId}`)
          .then((response) => {
            const wishlist = response.data;
            const isInWishlist = wishlist.some(
              (movie: any) => movie.videoID === String(seriesInfo?.id)
            );
            setIsInWishlist(isInWishlist);
          })
          .catch((error) => {
            console.error("Error fetching wishlist:", error);
          });
      } catch (error) {
        console.error("Failed to parse user from local storage:", error);
      }
    }
  }, [seriesInfo]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleAddToWishlist = async () => {
    if (user) {
      const userId = user.userId;
      const movieId = seriesInfo?.id;
      if (!userId || !movieId) {
        alert("User ID or Movie ID is missing");
        return;
      }
      try {
        await axios.post("/api/addwishlist", {
          userId,
          movieId,
        });
        setIsInWishlist(true);
      } catch (error) {
        console.error("Error adding movie to wishlist:", error);
      }
    } else {
      alert("User not found");
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (user) {
      const userId = user.userId;
      const movieId = seriesInfo?.id;
      if (!userId || !movieId) {
        alert("User ID or Movie ID is missing");
        return;
      }
      try {
        await axios.delete("/api/removefromwishlist", {
          params: {
            userId,
            movieId,
          },
        });
        setIsInWishlist(false);
      } catch (error) {
        console.error("Error removing movie from wishlist:", error);
      }
    } else {
      alert("User not found");
    }
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seasonNumber = parseInt(event.target.value, 10);
    setSelectedSeason(seasonNumber);
    handleFetchEpisodes(seasonNumber);
  };

  const router = useRouter();

  if (!visible) {
    return null;
  }

  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + seriesInfo?.backdrop_path;

  return (
    <div className="z-[65000] transition  w-auto duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-y-scroll ">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300  relative flex-auto max-h-[90vh] bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-48 md:h-96">
            <video
              poster={thumbnailUrl}
              autoPlay
              muted
              loop
              className="w-full brightness-[60%] object-cover min-w-full h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {seriesInfo?.name}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <button
                  onClick={() => {
                    const watchingElement = document.getElementById("watching");
                    if (watchingElement) {
                      watchingElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-white rounded-3xl py-1 md:py-2 px-3 md:px-6 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black"
                >
                  <PlayIcon className="w-4 md:w-7 text-black mr-1" />
                  Watch Series
                </button>
              </div>
            </div>
            {user && (
              <div className="absolute bottom-[10%] right-10">
                <button
                  onClick={
                    isInWishlist
                      ? handleRemoveFromWishlist
                      : handleAddToWishlist
                  }
                  className="flex flex-row gap-4 justify-center bg-white/10 rounded-full hover:bg-white/30 p-2 backdrop-blur-sm items-center"
                >
                  {isInWishlist ? (
                    <CheckIcon className="w-7 h-7" />
                  ) : (
                    <PlusIcon className="w-7 h-7" />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="pl-6 md:pl-12 py-4 md:py-8 flex flex-col w-full gap-5">
            <div className="flex flex-row gap-8 justify-between w-full h-full pr-4 md:pr-6">
              <div className="flex flex-col w-[70%] h-full">
                <div className="flex flex-row items-center gap-3">
                  <p className="text-lg text-green-400 ">
                    {seriesInfo?.number_of_seasons} Seasons {"   "}
                  </p>
                  <p className="text-gray-300 text-lg">
                    {seriesInfo?.number_of_episodes} Episodes
                  </p>
                </div>
                <p className="text-white text-lg w-auto mb-7">
                  {seriesInfo?.vote_average.toFixed(1)}
                  {"/10"}
                </p>
                <p className="text-white text-base">{seriesInfo?.overview}</p>
              </div>
              <div className="w-[30%] h-full flex flex-col gap-3 justify-start items-start">
                <div className="text-white  text-base">
                  <span className="text-gray-200 font-bold">Starring: </span>
                  {castData?.cast[0].name}, {castData?.cast[1].name},{" "}
                  {castData?.cast[2].name}
                </div>
                <div className="text-white  text-base">
                  <span className="text-gray-200 font-bold">Genre: </span>
                  {seriesInfo?.genres &&
                    seriesInfo?.genres.length > 0 &&
                    (seriesInfo?.genres[0] as { name: string })?.name}
                  {seriesInfo?.genres &&
                    seriesInfo?.genres.length > 1 &&
                    `, ${(seriesInfo?.genres[1] as { name: string })?.name}`}
                  {seriesInfo?.genres &&
                    seriesInfo?.genres.length > 2 &&
                    `, ${(seriesInfo?.genres[2] as { name: string })?.name}`}
                  {seriesInfo?.genres &&
                    seriesInfo?.genres.length > 3 &&
                    `, ${(seriesInfo?.genres[3] as { name: string })?.name}`}
                </div>
              </div>
            </div>
            <div id="watching" className="mt-4 w-full flex flex-col">
              <div className="mb-10 flex flex-row gap-3 justify-start items-center">
                <h3 className="text-white text-lg font-bold">Seasons:</h3>
                <select
                  className="bg-zinc-700 text-white p-2 rounded-lg"
                  onChange={handleSeasonChange}
                  value={selectedSeason}
                >
                  {seasons.map((season) => (
                    <option key={season.id} value={season.season_number}>
                      {season.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-4 w-full">
                {episodes.map((episode, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-4 pr-2 w-full hover:bg-zinc-800 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/watch/series/${
                          seriesInfo?.id
                        }/season/${selectedSeason}/episode/${index + 1}`
                      )
                    }
                  >
                    <div
                      className="w-[300px] relative"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                        alt={episode.name}
                        className="object-cover rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-[70%] p-2">
                      <p className="text-white text-lg font-bold">
                        {episode.name}
                      </p>
                      <p className="text-gray-300 text-base">
                        {episode.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesInfoModal;