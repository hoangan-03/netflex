import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { PlayButtonProps } from '@/types';

const PlayButton= ({ movieId }:PlayButtonProps ) => {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}`)}
      className=" bg-white rounded-3xl py-1 md:py-2 px-3 md:px-6 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black">
        <PlayIcon className="w-4 md:w-7 text-black mr-1" />
        Watch Movie
    </button>
  );
}
export default PlayButton;