'use client';

import IntList from './components/IntList';
import { Head, Body } from './components/Display';
import { useEffect, useState } from 'react';
import type { Data } from './components/types.ts';

export default function MagniQuakePage() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch('https://dev.narikakun.net/webapi/earthquake/post_data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error('データ取得に失敗:', err);
      });
  }, []);

  if (!data) {
    return <p>読み込み中...</p>;
  }

  const headData = data.Head;
  const bodyData = data.Body;
  const intListData = bodyData.Intensity.Observation.Pref;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Magniquake</h1>
      <div className="font-bold bg-gray-200 p-4 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow space-y-4 mb-4">
        <Head data={headData} />
        <Body data={bodyData} />
        <IntList prefs={intListData} />
      </div>
    </div>
  );
}
