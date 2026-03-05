import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  href: string;
  img?: string;
}

const Card: React.FC<CardProps> = ({ title, description, href, img }) => {
  return (
    <div className="w-full md:w-1/3 mb-4 px-2">
      <Link to={href} className="block group">
        <div className="bg-card-bg border border-border shadow-sm rounded-xl overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-[1.02] group-hover:border-accent/50">
          {img ? (
            <img
              src={img}
              alt={`${title}のサムネイル画像`}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-muted-bg transition-colors duration-300 flex flex-col items-center justify-center text-main-text opacity-40 gap-2">
              <span className="text-sm font-medium">No Image</span>
            </div>
          )}
          <div className="p-6">
            <h5 className="text-xl font-bold mb-2 text-main-text group-hover:text-accent transition-colors">{title}</h5>
            <p className="text-main-text opacity-70 line-clamp-3">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
