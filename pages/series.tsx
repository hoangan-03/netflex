import React from "react";
import Navbar from "@/components/Navbar";
import SeriesList from "@/components/SeriesList";
import SeriesInfoModal from "@/components/SeriesInfoModal";
import SeriesViewModal from "@/components/SeriesViewModal";

import useSeriesInfoStore from "@/hooks/useSeriesInfoStore";
import useSeriesList from "@/hooks/useSeriesList";
import { fetchSeries } from "../api/film";
import { useState, useEffect } from "react";
import useViewStore from "@/hooks/useViewStore";
import useViewSeriesStore from "@/hooks/useViewSeriesStore";
import { SeriesInterface, Genre } from "@/types";

const Series = () => {
  const { data: series = [] } = useSeriesList();
  const [fetchedSeries, setFetchedSeries] = useState(series);

  useEffect(() => {
    Promise.all(series.map((se: any) => fetchSeries(se.seriesID)))
      .then((dataa) => {
        const newSeries = series.map((se: any) => {
          const matchingData = dataa.find((d) => d.id == se.seriesID);
          return matchingData ? { ...se, ...matchingData } : se;
        });
        setFetchedSeries(newSeries);
      })
      .catch((error) => console.error(error));
  }, [series]);
  const { isOpen, closeModal } = useSeriesInfoStore();
  const { ViewModalopen, closeViewModal } = useViewSeriesStore();
  const kDrama = fetchedSeries.filter((series: SeriesInterface) =>
    series.origin_country?.includes("KR") && series.genres?.some((genre: Genre) => genre.name === "Drama") 
  );
  const usSeries = fetchedSeries.filter((series: SeriesInterface) =>
    series.origin_country?.includes("US") 
  );
  const anime = fetchedSeries.filter(
    (series: SeriesInterface) =>
      series.genres?.some((genre: Genre) => genre.name === "Animation") &&
      series.original_language === "ja"
  );
  

  return (
    <>
      <SeriesInfoModal visible={isOpen} onClose={closeModal} />
      <SeriesViewModal visible={ViewModalopen} onClose={closeViewModal} />
      <Navbar />
      <div className="w-full h-auto bg-black flex flex-col gap-2 pt-[100px] pb-16 overflow-hidden">
        <SeriesList title="Suggestions for you" data={fetchedSeries} />
        <SeriesList title="K-Dramas" data={kDrama} />
        <SeriesList title="Anime" data={anime} />
        <SeriesList title="US Series" data={usSeries} />
      </div>
    </>
  );
};

export default Series;
