import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import useSeriesEpisode from "@/hooks/useSeriesEpisode";
const apikey: string = process.env.NEXT_PUBLIC_API_KEY ?? "";



const Episode = () => {
  const router = useRouter();
  const { seriesId, seasonNumber, episodeNumber } = router.query;
  const [movieName, setMovieName] = useState("");
  const { data: episode, error, isLoading, } = useSeriesEpisode(seriesId as string, seasonNumber as string, episodeNumber as string);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apikey}`)
      .then((response) => response.json())
      .then((data) => setMovieName(data.name));
  }, [seriesId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading episode data.</div>;
  }
  if (!episode) {
    return <div>Episode not found.</div>;
  }
  return (
    <div className="h-screen w-screen bg-black z-20">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black/20">
        <ArrowLeftIcon
          onClick={() => router.back()}
          className="w-[20px] md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <h2 className="text-2xl text-white font-bold">
          Watching: {movieName} <span className="font-semibold text-red-500">S{seasonNumber} E{episodeNumber}</span> 
        </h2>
      </nav>
      <iframe
        className="h-full w-full z-0"
        src={
          episode.seasons[parseInt(seasonNumber as string, 10) - 1].episodes[
            parseInt(episodeNumber as string, 10) - 1
          ].episodeUrl
        }
        allowFullScreen
      />
    </div>
  );
};

export default Episode;
