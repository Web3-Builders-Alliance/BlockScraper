import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <div className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo-icon.svg"
            width={27}
            height={27}
            alt="logo"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
