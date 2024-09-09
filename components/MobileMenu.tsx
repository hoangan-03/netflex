import React from 'react';
import { MobileMenuProps } from '@/types';
import Link from 'next/link';

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <Link href="/" className="px-3 text-start text-white hover:underline">
          Home
        </Link>
        <Link href="/films" className="px-3 text-start text-white hover:underline">
          Movies
        </Link>
        <Link href="/time" className="px-3 text-start text-white hover:underline">
          Time by time
        </Link>
        <Link href="/random" className="px-3 text-start text-white hover:underline">
          Random selection
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;