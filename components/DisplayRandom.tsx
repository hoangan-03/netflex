/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PlayButton from "@/components/PlayButton";
import useInfoModalStore from "@/hooks/useInfoStore";
import { MovieListProps } from "@/types";

const DisplayRandom = ({ data }: MovieListProps) => {
  const { openModal } = useInfoModalStore();
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * data.length));
  }, [data]);

  const handleOpenModal = useCallback(() => {
    openModal(data[randomIndex]);
  }, [openModal, data, randomIndex]);
  const overview = data[randomIndex]?.overview;
  const truncatedOverview =
    overview && overview.length > 250 ? `${overview.slice(0, 250)}...` : overview;

  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + data[randomIndex]?.backdrop_path;
  return (
    <div className="relative h-[90vw] md:h-[56.25vw] mb-8  w-full ">
      <img
        src={thumbnailUrl}
        alt="Movie Thumbnail"
        className="w-full h-full object-cover brightness-[60%] transition duration-500"
      />
      <div className="absolute top-[30%] ml-16 w-[80%] md:w-full h-auto mb-8">
        <p className="text-white text-xl md:text-5xl h-full w-full md:w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data[randomIndex]?.title}
        </p>
        <p className="text-white text-base text-justify md:text-lg mt-1 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {truncatedOverview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data[randomIndex]?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-20 
              backdrop-blur-lg
              rounded-3xl 
              py-1 md:py-2 
              px-3 md:px-6
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-40
              transition
            "
          >
            <InformationCircleIcon className="w-3 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default DisplayRandom;
