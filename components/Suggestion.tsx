import React, { useRef } from "react";
import MovieCard from "@/components/MovieCard";
import leftIcon from "../assets/icon/left.png";
import rightIcon from "../assets/icon/right.png";
import Image from "next/image";
import { MovieListProps } from "@/types";

const Suggestion = ({ data, title }: MovieListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="px-4 md:px-12 mt-4 mb-8">
      <div className="w-full relative h-[500px] overflow-hidden">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-8 w-auto h-[30px]">
          {title}
        </p>
        <button
          className="absolute top-0 z-[1000] text-2xl bg-black/20 h-[350px] w-[30px] left-0 flex items-center justify-center"
          onClick={() => scroll(-900)}
        >
          <Image
            className="w-6 h-6 object-cover invert"
            src={leftIcon}
            width={24}
            height={24}
            alt=""
          />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex flex-row h-full gap-6 w-[auto] overflow-auto "
        >
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
        <button
          className="absolute top-0 z-[1000] text-2xl bg-black/20 h-[250px] w-[30px] right-0  flex items-center justify-center"
          onClick={() => scroll(900)}
        >
          <Image
            className="w-6 h-6 object-cover invert"
            src={rightIcon}
            width={24}
            height={24}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Suggestion;
