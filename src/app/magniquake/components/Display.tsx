import { InfoBox, groupByInt, formatDateTime } from './quakeUtil';
import type { Pref, Head, Body, Data } from './types';
import { useEffect, useState } from 'react';

export function IntList({ data }: { data: Data }) {
  const prefs: Pref[] = data.Body.Intensity.Observation.Pref;

  const grouped = groupByInt(prefs);
  const intOrder = ['7', '6+', '6-', '5+', '5-', '4', '3', '2', '1'];

  const maxInt = intOrder.find((int) => grouped[int]);
  const needShowAll = Object.keys(grouped).length > 1;

  const [showAll, setShowAll] = useState(false);

  return (
    <InfoBox title="各地の震度">
      {intOrder
        .filter((int) => grouped[int])
        .filter((int) => showAll || int === maxInt)
        .map((int) => {
          const g = grouped[int];
          if (!g) return null;
          return <IntBlock key={int} int={int} data={g} />;
        })}

      {!showAll && needShowAll && (
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 content-right"
            onClick={() => setShowAll(true)}
          >
            他の地域も表示
          </button>
        </div>
      )}
    </InfoBox>
  );
}

export function Head({ data }: { data: Head }) {
  return (
    <h1>
      <span className="text-xl">{data.Title}</span>
    </h1>
  );
}

export function Body({ data }: { data: Body }) {
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
    <div>
      <InfoBox title="画面更新日時">{timeStr}</InfoBox>
      <InfoBox title="発生日時">{formatDateTime(data.Earthquake.OriginTime)}</InfoBox>
      <InfoBox title="震源地">{data.Earthquake.Hypocenter.Name}</InfoBox>
      <InfoBox title="震源の深さ">{depth}</InfoBox>
      <InfoBox title="マグニチュード">{magnitude}</InfoBox>
    </div>
  );
}

// 内部の関数たち
function IntBlock({ int, data }: { int: string; data: Record<string, string[]> }) {
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

function PrefBlock({ prefName, cities }: { prefName: string; cities: string[] }) {
  return (
    <div className="ml-4 mt-2">
      <h3 className="text-lg font-semibold">{prefName}</h3>
      <ul className="ml-4 list-disc">
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
}
