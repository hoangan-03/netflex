import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";

import { MovieInterface } from "../types";
import useInfoModalStore from "../hooks/useInfoStore";

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );
  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + data.backdrop_path;

  return (
    <div className="h-[20vw] w-[250px]">
      <div className="flex-col h-full pb-[30px] bg-zinc-900 w-[250px] transition-all duration-300 gap-2 justify-start rounded-md items-start hover:scale-125 hover:translate-y-12 z-[500] flex">
        <img
          onClick={redirectToWatch}
          src={thumbnailUrl}
          alt="Movie"
          className="cursor-pointer object-cover shadow-xl rounded-md  hover:rounded-b-none w-full h-[12vw]"
        />
        <div className="flex flex-row justify-between w-full px-4 py-2">
          <div
            onClick={redirectToWatch}
            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
          >
            <PlayIcon className="text-black w-4 lg:w-6" />
          </div>
          <div className="w-auto h-[40px] max-w-[100px] flex justify-center items-center ml-4">
            <h1 className="text-white text-bold text-base">
              {data?.title?.length > 20
                ? `${data.title.substring(0, 20)} ...`
                : data.title}
            </h1>
          </div>
          <div
            onClick={() => openModal(data)}
            className="cursor-pointer ml-auto w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
          >
            <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
          </div>
        </div>
        <p className="text-green-400 px-4 w-full font-semibold mt-1">
          {data?.release_date?.substring(0, 4)}{" "}
          <span className="text-gray-400">
            {Math.floor(data?.runtime / 60)}h {data?.runtime % 60}m
          </span>
        </p>
        <div className="flex flex-row px-4 pb-6 items-center gap-2 text-[12px] text-white lg:text-sm">
          <p>
            {data.genres &&
              data.genres.length > 0 &&
              ((data.genres[0] as { name: string }).name === "Science Fiction"
                ? "Sci-Fi"
                : (data.genres[0] as { name: string }).name)}{" "}
            •{" "}
            {data.genres &&
              data.genres.length > 1 &&
              ((data.genres[1] as { name: string }).name === "Science Fiction"
                ? "Sci-Fi"
                : (data.genres[1] as { name: string }).name)}
            {data.genres &&
              data.genres.length > 2 &&
              ` • ${
                (data.genres[2] as { name: string }).name === "Science Fiction"
                  ? "Sci-Fi"
                  : (data.genres[2] as { name: string }).name
              }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
