import React from 'react';
import { MobileMenuProps } from '@/types';
import Link from 'next/link';

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black/80 backdrop-blur-2xl w-56 flex flex-col gap-4 absolute top-10 left-0 py-4 border-2 border-gray-600 rounded-lg">
      <Link href="/" className="px-3 text-start text-white hover:underline hover:text-gray-300">
        Home
      </Link>
      <Link href="/films" className="px-3 text-start text-white hover:underline hover:text-gray-300">
        Movies
      </Link>
      <Link href="/series" className="px-3 text-start text-white hover:underline hover:text-gray-300">
        Series
      </Link>
      <Link href="/time" className="px-3 text-start text-white hover:underline hover:text-gray-300">
        Time by time
      </Link>
      <Link href="/random" className="px-3 text-start text-white hover:underline hover:text-gray-300">
        Random selection
      </Link>
    </div>
  );
};

export default MobileMenu;