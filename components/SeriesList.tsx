import React, { useRef } from "react";
import leftIcon from "../assets/icon/left.png";
import rightIcon from "../assets/icon/right.png";
import Image from "next/image";
import useViewStore from "@/hooks/useViewStore";
import useViewSeriesStore from "@/hooks/useViewSeriesStore";
import { SeriesListProps, ScrollButtonProps } from "@/types";
import SeriesCard from "@/components/SeriesCard";

const ScrollButton = ({ direction, scroll, icon }: ScrollButtonProps) => (
  <button
    className={`absolute top-0 z-[1000] bg-black/20 h-[350px] w-[30px] ${direction}-0  flex items-center justify-center`}
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

const SeriesList = ({ data, title }: SeriesListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useViewSeriesStore();
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
      <div className="w-full relative h-[300px] md:h-[480px] overflow-hidden">
        <div className="w-full h-auto flex flex-row gap-4 justify-start items-center mb-8 ">
          <h1 className="pl-16 text-white text-base md:text-2xl lg:text-3xl font-semibold w-auto h-auto">
            {title}
          </h1>
          <button className="text-grandblue flex flex-row gap-1 w-auto text-sm h-auto text-start justify-center items-end ">
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
          className="px-16 flex flex-row h-full gap-6 w-[auto] overflow-auto "
        >
          {data.map((series) => (
            <SeriesCard key={series.id} data={series} />
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

export default SeriesList;