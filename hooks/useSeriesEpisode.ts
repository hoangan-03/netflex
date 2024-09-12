import useSwr from 'swr';
import fetcher from '@/lib/fetcher';

const useSeriesEpisode = (seriesId?: string, seasonNumber?: string, episodeNumber?: string) => {
  const { data, error, isLoading } = useSwr(
    seriesId && seasonNumber && episodeNumber 
      ? `/api/series/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}` 
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading
  };
};

export default useSeriesEpisode;