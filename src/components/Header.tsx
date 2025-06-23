'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-bold">
          Vipelar
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/magniquake" className="hover:text-blue-700">
            Magniquake
          </Link>
          <Link href="/contact" className="hover:text-blue-700">
            Contact
          </Link>
        </nav>

        {/* for desktop */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* for mobile */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full py-2">
          <Link
            href="/magniquake"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Magniquake
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
