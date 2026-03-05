import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateTheme();

    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }

    // システム設定の変更を監視
    const handleChange = () => {
      if (theme === 'system') updateTheme();
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // ドロップダウンの外側をクリックした時に閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'ライト', icon: <Sun size={16} /> },
    { value: 'dark', label: 'ダーク', icon: <Moon size={16} /> },
    { value: 'system', label: 'システム', icon: <Monitor size={16} /> },
  ];

  const currentOption = options.find((opt) => opt.value === theme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card-bg text-main-text hover:ring-2 hover:ring-vipelar transition-all text-sm font-medium border border-border shadow-sm"
        aria-label="Change theme"
      >
        {currentOption?.icon}
        <span className="hidden sm:inline">{currentOption?.label}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-background border border-border shadow-xl z-[100] overflow-hidden transition-all">
          <div className="p-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  theme === opt.value
                    ? 'bg-vipelar/10 text-vipelar'
                    : 'text-main-text opacity-70 hover:bg-card-bg'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
