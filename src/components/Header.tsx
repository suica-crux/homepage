'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links: { href: string; label: string }[] = [{ href: '/magniquake', label: 'Magniquake' }];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex gap-x-2 items-center">
          <Image src="/favicon.ico" width={40} height={40} alt="logo" className="rounded" />
          <Link href="/" className="text-xl font-bold">
            <span className="text-xl font-bold">Vipelar</span>
          </Link>
        </div>

        <nav className="hidden space-x-6 md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="inline-flex items-center hover:text-blue-500">
              {label}
            </Link>
          ))}
        </nav>

        {/* for desktop */}

        <button
          className="p-4 -m-2 border rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* for mobile */}

      <nav
        ref={menuRef}
        className={`md:hidden bg-white shadow-md absolute top-16 left-0 w-full py-2 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="block px-4 py-2" onClick={() => setIsOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
