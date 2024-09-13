import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useMovieList from "@/hooks/useMovieList";
import useSeriesList from "@/hooks/useSeriesList"; // Import the hook for fetching series
import MovieCard from "@/components/MovieCard";
import SeriesCard from "@/components/SeriesCardResponsive"; // Import the SeriesCard component
import { MovieInterface, SeriesInterface, SearchResult } from "@/types";
import { fetchMovie, fetchSeries } from "@/api/film";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoStore";
import useSeriesInfoStore from "@/hooks/useSeriesInfoStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import MovieCardResponsive from "@/components/MovieCardResponsive";
import SeriesInfoModal from "@/components/SeriesInfoModal";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const { isOpen, closeModal } = useInfoModalStore();
  const { isOpen: isSeriesOpen, closeModal: closeSeriesModal } =
    useSeriesInfoStore();

  const { data: movies = [] } = useMovieList();
  const { data: series = [] } = useSeriesList();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      const fetchMovies = Promise.all(
        movies.map((movie: any) => fetchMovie(movie.videoID.toString()))
      );
      const fetchSeriesData = Promise.all(
        series.map((series: any) => fetchSeries(series.seriesID.toString()))
      );

      Promise.all([fetchMovies, fetchSeriesData])
        .then(([fetchedMovies, fetchedSeries]) => {
          const filteredMovies = fetchedMovies.filter(
            (movie: any) =>
              movie.title &&
              movie.title
                .toLowerCase()
                .startsWith((query as string).toLowerCase())
          );
          const filteredSeries = fetchedSeries.filter(
            (series: any) =>
              series.name &&
              series.name
                .toLowerCase()
                .startsWith((query as string).toLowerCase())
          );
          const combinedResults = shuffleArray([
            ...filteredMovies,
            ...filteredSeries,
          ]);
          setSearchResults(combinedResults);
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [query, movies, series]);

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <SeriesInfoModal visible={isSeriesOpen} onClose={closeSeriesModal} />
      <div className="ml-4 lg:ml-16 my-8 py-1 h-auto bg-black">
        <div className="flex items-center mb-12 w-full px-3">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center p-2 mr-4 rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl lg:text-3xl font-bold">Search Results for <span className="text-red-600">{query}</span></h1>
        </div>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full gap-20 sm:gap-4 px-10">
            {searchResults.map((result) => {
              if ((result as unknown as MovieInterface).title) {
                return (
                  <MovieCardResponsive
                    key={result.id.toString()}
                    data={result as unknown as MovieInterface}
                  />
                );
              } else {
                return (
                  <SeriesCard
                    key={result.id.toString()}
                    data={result as unknown as SeriesInterface}
                  />
                );
              }
            })}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
