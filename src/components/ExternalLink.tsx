'use client';

import Link from 'next/link';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import React from 'react';

export default function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ExternalLinkIcon size={16} />
    </Link>
  );
}
