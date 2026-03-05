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
      <Link to={href} className="block">
        <div className="bg-white shadow rounded-lg overflow-hidden ring-2 ring-transparent transition-all duration-200 ease-in-out hover:ring-vipelar hover:shadow-lg">
          {img ? (
            <img
              src={img}
              alt={`${title}のサムネイル画像`}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="p-4">
            <h5 className="text-lg font-semibold mb-2">{title}</h5>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
