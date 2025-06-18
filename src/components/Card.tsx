'use client';

import Link from 'next/link';
import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  href: string;
  img?: string;
};

export default function Card({ title, description, href, img }: CardProps) {
  return (
    <div className="w-full md:w-1/3 mb-4 px-2">
      <Link href={href} className="block">
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          {img ? (
            <Image
              src={img}
              alt={`${title}のサムネイル画像`}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 g-gray-200 flex items-center justify-center text-gray-500">
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
}
