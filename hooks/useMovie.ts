import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useMovie = (videoID?: string) => {
  const { data, error, isLoading } = useSwr(videoID ? `/api/movies/${videoID}` : null, fetcher, {
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

export default useMovie;
