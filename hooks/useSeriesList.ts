import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useSeriesList = () => {
  const { data, error, isLoading } = useSwr('/api/series', fetcher, {
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

export default useSeriesList;
