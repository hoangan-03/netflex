/* eslint-disable @next/next/no-img-element */
import { useCallback } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import useSeriesInfoStore from "@/hooks/useSeriesInfoStore";
import { SeriesCardProps } from "../types";

const SeriesCard= ({ data }: SeriesCardProps) => {
  const router = useRouter();
  const { openModal } = useSeriesInfoStore();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );
  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + data.backdrop_path;

  return (
    <div className="h-[32vh] sm:h-[42vh] md:h-[35vw] xl:h-[20vw] w-[250px]">
      <div className="flex-col h-full pb-[30px] bg-zinc-900 w-[250px] transition-all duration-300 gap-2 justify-start rounded-md items-start hover:scale-125 hover:translate-y-12 z-[500] flex">
        <img
          onClick={redirectToWatch}
          src={thumbnailUrl}
          alt="Movie"
          className="cursor-pointer object-cover shadow-xl rounded-md hover:rounded-b-none w-full h-[22vw] md:h-[8vw]"
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
              {data?.name?.length > 20
                ? `${data.name.substring(0, 20)} ...`
                : data.name}
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
          {data?.number_of_seasons} Seasons {"   "}
          <span className="text-gray-400">
          {data?.number_of_episodes} Episodes
          </span>
        </p>
                <div className="flex flex-row px-4 pb-6 items-center gap-2 text-[12px] text-white lg:text-sm">
          <p>
            {data.genres && data.genres.length > 0
              ? data.genres
                  .map((genre: { name: string }) =>
                    genre.name === "Science Fiction" ? "Sci-Fi" : genre.name
                  )
                  .join(" • ")
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
