/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import useSeriesInfoStore from "@/hooks/useSeriesInfoStore";
import { SeriesCardProps } from "../types";

const SeriesCard = ({ data }: SeriesCardProps) => {
  const { openModal } = useSeriesInfoStore();
  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + data.backdrop_path;

  return (
    <div className="h-[60%] w-auto xl:w-[250px] min-w-[250px]">
      <div className="flex-col h-full bg-zinc-900 w-full xl:w-[250px] transition-all duration-300 gap-2 justify-start rounded-md items-start hover:lg:scale-125 hover:lg:translate-y-12 z-[500] flex">
        <img
          onClick={() => openModal(data)}
          src={thumbnailUrl}
          alt="Movie"
          className="cursor-pointer object-cover shadow-xl rounded-md hover:rounded-b-none w-full h-[120px]"
        />
        <div className="flex flex-row justify-between w-full px-4 py-2">
          <div className="w-auto h-[40px] max-w-auto flex justify-center items-center">
            <h1 className="text-white text-bold text-base">
              {data?.name?.length > 20
                ? `${data.name.substring(0, 20)} ...`
                : data.name}
            </h1>
          </div>
          <div className="flex justify-center items-center h-full">
          <div
            onClick={() => openModal(data)}
            className="cursor-pointer ml-auto w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
          >
            <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
          </div>
          </div>

        </div>
        <p className="text-green-400 px-4 w-full font-semibold mt-1">
          {data?.number_of_seasons}{" "}
          {data?.number_of_seasons === 1 ? "Season" : "Seasons"} {"   "}
          <span className="text-gray-400">
            {data?.number_of_episodes} Episodes
          </span>
        </p>
        <div className="flex flex-row px-4 pb-6 items-center gap-2 text-[12px] text-white lg:text-sm">
          <p>
            {data.genres && data.genres.length > 0
              ? data.genres
                  .slice(0, 3)
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
