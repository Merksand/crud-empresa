import { useState } from 'react';
import Link from 'next/link';

const TreeItem = ({ isOpen, pathname, title, icon, href }) => {
  return (
    <li className="px-2 select-none">
      <Link
        href={href}
        className={`relative flex items-center gap-3 px-3 py-3 h-10 rounded-lg transition-colors ${
          pathname === href
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <div className="min-w-[24px] w-6 h-6 flex justify-center items-center">
          {icon}
        </div>
        <span
          className={`transition-all duration-300 ${
            !isOpen ? "opacity-0 w-0" : "opacity-100"
          }`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};

export default TreeItem;
