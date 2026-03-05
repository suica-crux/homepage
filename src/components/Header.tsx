import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Header: React.FC = () => {
  const links = [{ href: '/magniquake', label: 'Magniquake' }];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex gap-x-2 items-center">
          <Link to="/" className="flex items-center gap-x-2 hover:opacity-80 transition-opacity font-bold">
            <img src="/favicon.ico" width={40} height={40} alt="logo" className="rounded" />
            <span className="text-xl font-bold">Vipelar</span>
          </Link>
        </div>

        <nav className="hidden space-x-6 md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} to={href} className="inline-flex items-center hover:text-blue-500">
              {label}
            </Link>
          ))}
        </nav>
        <Menu links={links} />
      </div>
    </header>
  );
};

export default Header;
