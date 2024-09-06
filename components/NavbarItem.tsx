import React from 'react';
import { NavbarItemProps } from '@/types';

const NavbarItem = ({ label, active }: NavbarItemProps) => {
  return (
    <div className={active ? 'text-white cursor-default font-extrabold' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default NavbarItem;
