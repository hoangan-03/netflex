import React, { useCallback,useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MovieInterface } from "@/types";
import PlayButton from "@/components/PlayButton";
import useBillboard from "@/hooks/useRandom";
import useInfoModalStore from "@/hooks/useInfoStore";

interface MovieListProps {
  data: MovieInterface[];
}

const DisplayRandom: React.FC<MovieListProps> = ({ data }) => {
  const { openModal } = useInfoModalStore();

  const [randomIndex] = useState(Math.floor(Math.random() * data.length));

  const handleOpenModal = useCallback(() => {
    openModal(data[randomIndex]);
  }, [openModal, data, randomIndex]);

  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + data[randomIndex]?.backdrop_path;
  return (
    <div className="relative h-[56.25vw] w-full overflow-hidden">
      <video
        poster={thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data[randomIndex]?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data[randomIndex]?.original_title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data[randomIndex]?.overview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data[randomIndex]?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default DisplayRandom;
