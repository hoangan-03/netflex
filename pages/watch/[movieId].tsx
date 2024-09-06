import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";
const apikey: string = process.env.NEXT_PUBLIC_API_KEY ?? '';
const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  const [movieName, setMovieName] = useState('');
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`)
      .then(response => response.json())
      .then(data => setMovieName(data.title));
  }, [movieId]);

  return (
    <div className="h-screen w-screen bg-black z-20">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black/20">
        <ArrowLeftIcon
          onClick={() => router.push("/")}
          className="w-[20px] md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <h2 className="text-2xl text-white font-bold">Watching: {movieName}</h2>
      </nav>
      <iframe
        className="h-full w-full z-0"
        src={data?.videoUrl}
        allowFullScreen
      />
    </div>
  );
};

export default Watch;