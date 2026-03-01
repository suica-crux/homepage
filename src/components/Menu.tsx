import { useState, useRef, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

type Link = {
  href: string;
  label: string;
};

export default function Menu({ links }: { links: Link[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <>
      <button
        className="p-4 -m-2 rounded-md md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>
      <nav
        ref={menuRef}
        className={`md:hidden bg-white shadow-md absolute top-16 left-0 w-full py-2 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="block px-4 py-2" onClick={() => setIsOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}

export function HeaderDesktop() {
  return <>{/* for desktop */}</>;
}
