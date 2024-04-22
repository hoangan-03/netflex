import React, { useEffect, useState,SetStateAction } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import useMovie from '@/hooks/useMovie';

interface PlayButtonProps {
  movieId: any;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  const movie = useMovie(movieId);
  console.log("movie",movie);

  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        text-black
        "
      >
        <PlayIcon className="w-4 md:w-7 text-black mr-1" />
        Play
    </button>
  );
  
}

export default PlayButton;