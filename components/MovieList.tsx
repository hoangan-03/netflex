import React, { useRef } from "react";
import { MovieInterface } from "@/types";
import MovieCard from "@/components/MovieCard";
import { isEmpty } from "lodash";
import leftIcon from "../assets/icon/left.png";
import rightIcon from "../assets/icon/right.png";
import rightBlueIcon from "../assets/icon/right-blue.png";
import Image from "next/image";
import { StaticImageData } from "next/image";
import useViewStore from "@/hooks/useViewStore";

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}
interface ScrollButtonProps {
  direction: "left" | "right";
  scroll: () => void;
  icon: StaticImageData;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  scroll,
  icon,
}) => (
  <button
    className={`absolute top-0 z-[1000] text-2xl bg-black/20 h-[350px] w-[30px] ${direction}-0 flex items-center justify-center`}
    onClick={scroll}
  >
    <Image
      className="w-6 h-6 object-cover invert"
      src={icon}
      width={24}
      height={24}
      alt=""
    />
  </button>
);

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {openModal} = useViewStore();

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-4 md:px-12 mt-4 mb-8">
      <div className="w-full relative h-[420px] overflow-hidden">
        <div className="w-full h-auto flex flex-row gap-4 justify-start items-center mb-8 ">
          <h1 className="text-white text-base md:text-2xl lg:text-3xl font-semibold w-auto h-auto">
            {title}
          </h1>
          <button className="text-grandblue flex flex-row gap-1 w-auto text-sm h-auto text-start justify-center items-end">
            <div onClick={() => openModal(data, title)}>Explore All</div>
            <Image
              className="w-3 h-3 mb-1 object-cover invert"
              src={rightIcon}
              alt=""
            />
          </button>
        </div>
        <ScrollButton
          direction="left"
          scroll={() => scroll(-900)}
          icon={leftIcon}
        />
        <div
          ref={scrollContainerRef}
          className="flex flex-row h-full gap-6 w-[auto] overflow-auto "
        >
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
        <ScrollButton
          direction="right"
          scroll={() => scroll(900)}
          icon={rightIcon}
        />
      </div>
    </div>
  );
};

export default MovieList;
