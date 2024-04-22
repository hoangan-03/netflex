import React from 'react';
import { useEffect, useRef } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import Artplayer from 'artplayer'; // make sure to import Artplayer
const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    if (playerContainerRef.current) {
      const player = new Artplayer({
        container: playerContainerRef.current,
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      });

      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      
        <div className="h-full w-full" ref={playerContainerRef} />
    </div>
  );
};

export default Watch;
