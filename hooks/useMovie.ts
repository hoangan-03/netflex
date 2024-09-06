import useSwr from 'swr'
import fetcher from '@/lib/fetcher';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMovie = (videoID?: string) => {
  const { data, error, isLoading } = useSwr(videoID ? `${baseUrl}/api/movies/${videoID}` : null, fetcher, {
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
