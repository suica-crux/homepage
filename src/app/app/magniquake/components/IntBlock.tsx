import PrefBlock from './IntPref';
import React from 'react';

export default function IntBlock({ int, data }: { int: string; data: Record<string, string[]> }) {
  const intensityStyleMap: Record<string, { label: string; bg: string; text: string }> = {
    '1': { label: '1', bg: 'bg-sky-400', text: 'text-white' },
    '2': { label: '2', bg: 'bg-lime-300', text: 'text-black' },
    '3': { label: '3', bg: 'bg-yellow-300', text: 'text-black' },
    '4': { label: '4', bg: 'bg-orange-400', text: 'text-black' },
    '5-': { label: '5弱', bg: 'bg-red-400', text: 'text-white' },
    '5+': { label: '5強', bg: 'bg-red-600', text: 'text-white' },
    '6-': { label: '6弱', bg: 'bg-fuchsia-400', text: 'text-white' },
    '6+': { label: '6強', bg: 'bg-fuchsia-600', text: 'text-white' },
    '7': { label: '7', bg: 'bg-purple-800', text: 'text-white' },
  };

  const intData = intensityStyleMap[int] ?? {
    label: int,
    bg: 'bg-gray-200',
    text: 'text-black',
  };

  return (
    <div>
      <section className="border bg-white border-gray-500 rounded-lg pb-4 overflow-hidden mb-4">
        <h2 className={`${intData.text} ${intData.bg} text-xl p-4 font-bold`}>
          震度{intData.label}
        </h2>
        {Object.entries(data).map(([pref, cities]) => (
          <PrefBlock key={pref} prefName={pref} cities={cities} />
        ))}
      </section>
    </div>
  );
}
