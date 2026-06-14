import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CardProps {
  index?: number;
  title: string;
  description: string;
  href: string;
}

/**
 * プロジェクト一覧で使用するエディトリアル風リストアイテム
 * 番号・タイトル・説明を横並びにし、ホバーでアクセントカラーへ反応します
 */
const Card: React.FC<CardProps> = ({ index, title, description, href }) => {
  return (
    <Link
      to={href}
      className="group flex items-start sm:items-baseline gap-4 sm:gap-8 py-8 border-b border-border transition-colors hover:border-vipelar"
    >
      {typeof index === 'number' && (
        <span className="text-sm font-bold text-main-text opacity-30 tabular-nums pt-1 sm:pt-0">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-main-text group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-main-text opacity-60 leading-relaxed max-w-2xl">{description}</p>
      </div>
      <ArrowUpRight
        className="shrink-0 w-6 h-6 mt-1 text-main-text opacity-30 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
        aria-hidden="true"
      />
    </Link>
  );
};

export default Card;
