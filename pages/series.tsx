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

  return (
    <>
      <SeriesInfoModal visible={isOpen} onClose={closeModal} />
      <SeriesViewModal visible={ViewModalopen} onClose={closeViewModal} />
      <Navbar />
      <div className="w-full h-auto flex flex-col gap-2 pt-[100px] pb-16 overflow-hidden">
      <SeriesList title="Suggestions for you" data={fetchedSeries} />
      </div>
    </>
  );
};

export default Series;