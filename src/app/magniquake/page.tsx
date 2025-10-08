'use client';

import { Head, Body, IntList } from './components/Display';
import { GetPostData } from './components/getData';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

export default function MagniQuakePage() {
  const data = GetPostData();

  if (!data) {
    return <p>読み込み中...</p>;
  }

  const headData = data.Head;
  const bodyData = data.Body;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Magniquake</h1>
      <div className="font-bold bg-gray-200 p-4 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow space-y-4 mb-4">
        <Head data={headData} />
        <Body data={bodyData} />
        <IntList data={data} />
      </div>
      <div className="text-center">
        <Link
          href="https://ntool.online/apidoc/earthquakeapi"
          className="underline inline-flex items-center gap-1"
          target="_blank"
        >
          API
          <ExternalLinkIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
