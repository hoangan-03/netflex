import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useMovieList from '@/hooks/useMovieList';
import MovieCard from '@/components/MovieCard';
import { MovieInterface } from '@/types';
import { fetchMovie } from '@/api/film';
import { SearchResult } from '@/types';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoStore';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MovieCardResponsive from '@/components/MovieCardResponsive';

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const { isOpen, closeModal } = useInfoModalStore();
  const { data: movies = [] } = useMovieList();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      Promise.all(movies.map((movie: any) => fetchMovie(movie.videoID.toString())))
        .then((fetchedData) => {
          const filteredMovies = fetchedData.filter((movie: any) =>
            movie.title && movie.title.toLowerCase().startsWith((query as string).toLowerCase())
          );
          setSearchResults(filteredMovies);
        })
        .catch((error) => console.error('Error fetching search results:', error));
    }
  }, [query, movies]);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="ml-16 my-8 py-1 h-auto">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center p-2 mr-4 rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5" />
       
          </button>
          <h1 className="text-2xl font-bold">Search Results for {query}</h1>
        </div>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full gap-4">
            {searchResults.map((result) => (
              <MovieCardResponsive key={result.id.toString()} data={result as unknown as MovieInterface} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;