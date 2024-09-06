import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useMovieList from '@/hooks/useMovieList';
import MovieCard from '@/components/MovieCard'; 
import { MovieInterface } from '@/types';
import { fetchMovie } from '@/api/film'; 
import { SearchResult } from '@/types';
const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const { data: movies = [] } = useMovieList();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      Promise.all(movies.map((movie: any) => fetchMovie(movie.videoID.toString())))
        .then((fetchedData) => {
          const filteredMovies = fetchedData.filter((movie: any) =>
            movie.title && movie.title.toLowerCase().includes((query as string).toLowerCase())
          );
          setSearchResults(filteredMovies);
        })
        .catch((error) => console.error('Error fetching search results:', error));
    }
  }, [query, movies]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for {query}</h1>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((result) => (
            <MovieCard key={result.id.toString()} data={result as unknown as MovieInterface} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;