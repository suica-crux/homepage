import { InfoBox, groupByInt, formatDateTime } from './quakeUtil';
import type { Pref, Head as HeadType, Body as BodyType, Data } from './types';
import { useEffect, useState } from 'react';

export function IntList({ data }: { data: Data }) {
  const prefs: Pref[] = data.Body.Intensity.Observation.Pref;

  const grouped = groupByInt(prefs);
  const intOrder = ['7', '6+', '6-', '5+', '5-', '4', '3', '2', '1'];

  const maxInt = intOrder.find((int) => grouped[int]);
  const needShowAll = Object.keys(grouped).length > 1;

  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {intOrder
          .filter((int) => grouped[int])
          .filter((int) => showAll || int === maxInt)
          .map((int) => {
            const g = grouped[int];
            if (!g) return null;
            return <IntBlock key={int} int={int} data={g} />;
          })}
      </div>

      {!showAll && needShowAll && (
        <div className="mt-12 text-center border-t border-gray-100 pt-8">
          <button
            className="inline-flex items-center gap-3 bg-vipelar/10 text-vipelar px-8 py-3 rounded-full hover:bg-vipelar/20 transition-colors font-bold text-base"
            onClick={() => setShowAll(true)}
          >
            すべての観測地点を表示 ({Object.keys(grouped).length} 階級)
          </button>
        </div>
      )}
    </div>
  );
}

export function Head({ data }: { data: HeadType }) {
  return (
    <h1 className="text-3xl md:text-5xl font-black text-dark leading-tight tracking-tight">
      {data.Title}
    </h1>
  );
}

export function Body({ data }: { data: BodyType }) {
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const now = new Date();
    const formattedNow = formatDateTime(now);
    setTimeStr(formattedNow);
  }, []);

  const depth =
    data.Earthquake.Hypocenter.Depth == '0' ? 'ごく浅い' : `${data.Earthquake.Hypocenter.Depth}km`;
  const magnitude = data.Earthquake.Magnitude == 'NaN' ? '不明' : `M${data.Earthquake.Magnitude}`;

  return (
    <div className="flex flex-col gap-8">
      <InfoBox title="震源地">{data.Earthquake.Hypocenter.Name}</InfoBox>
      <div className="grid grid-cols-2 gap-6">
        <InfoBox title="深さ">{depth}</InfoBox>
        <InfoBox title="マグニチュード">{magnitude}</InfoBox>
      </div>
      <InfoBox title="発生日時">{formatDateTime(data.Earthquake.OriginTime)}</InfoBox>
      <div className="pt-6 mt-6 border-t border-gray-100 italic">
        <InfoBox title="画面更新">{timeStr}</InfoBox>
      </div>
    </div>
  );
}

// 内部の関数たち
function IntBlock({ int, data }: { int: string; data: Record<string, string[]> }) {
  const intensityStyleMap: Record<string, { label: string; bg: string; text: string; border: string }> = {
    '1': { label: '1', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    '2': { label: '2', bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200' },
    '3': { label: '3', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    '4': { label: '4', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    '5-': { label: '5弱', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    '5+': { label: '5強', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    '6-': { label: '6弱', bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200' },
    '6+': { label: '6強', bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-300' },
    '7': { label: '7', bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' },
  };

  const intData = intensityStyleMap[int] ?? {
    label: int,
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
  };

  return (
    <div className={`border-l-8 ${intData.border} ${intData.bg} p-6 rounded-r-xl shadow-sm`}>
      <div className="flex items-center gap-3 mb-4 border-b border-white/50 pb-2">
        <span className={`text-4xl font-black ${intData.text}`}>震度 {intData.label}</span>
      </div>
      <div className="space-y-6">
        {Object.entries(data).map(([pref, cities]) => (
          <div key={pref}>
            <h3 className="text-lg font-black text-gray-700 mb-2">{pref}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {cities.map((city) => (
                <span key={city} className="text-base font-medium text-gray-600 bg-white/60 px-3 py-1 rounded-md border border-gray-100 shadow-sm">{city}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
