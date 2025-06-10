'use client';

import Link from 'next/link';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import React from 'react';

export default function ExternalLink({
  href,
  customClass,
  children,
}: {
  href: string;
  customClass: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 ${customClass}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ExternalLinkIcon size={16} />
    </Link>
  );
}
