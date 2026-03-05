import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import ThemeToggle from './ThemeToggle';

/**
 * 共通ヘッダーコンポーネント
 * ロゴ（左）、ナビゲーション・テーマスイッチ（右）のレイアウト
 */
const Header: React.FC = () => {
  const links = [{ href: '/magniquake', label: 'Magniquake' }];

  return (
    <header className="fixed top-0 left-0 w-full bg-background dark:bg-card-bg shadow-md z-50 transition-colors border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* ロゴエリア */}
        <div className="flex gap-x-2 items-center">
          <Link
            to="/"
            className="flex items-center gap-x-2 hover:opacity-80 transition-opacity font-bold text-main-text"
          >
            <img src="/favicon.ico" width={40} height={40} alt="logo" className="rounded" />
            <span className="text-xl font-bold">Vipelar</span>
          </Link>
        </div>

        {/* ナビゲーション & スイッチ（右側にグループ化） */}
        <div className="flex items-center gap-6">
          <nav className="hidden space-x-6 md:flex">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="inline-flex items-center text-main-text hover:text-accent transition-colors font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Menu links={links} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
