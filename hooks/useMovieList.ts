import useSwr from 'swr'
import fetcher from '@/lib/fetcher';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMovies = () => {
  const { data, error, isLoading } = useSwr(`${baseUrl}/api/movies`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovies;
