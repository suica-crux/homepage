import { InfoBox, groupByInt, formatDateTime } from './quakeUtil';
import type { Pref, Head as HeadType, Body as BodyType, Data } from './types';
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

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
        <div className="mt-12 text-center border-t border-border pt-8 transition-colors">
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
    <h1 className="text-3xl md:text-5xl font-black text-main-text leading-tight tracking-tight transition-colors">
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
      <div className="pt-6 mt-6 border-t border-border italic transition-colors opacity-70">
        <InfoBox title="画面更新">{timeStr}</InfoBox>
      </div>
    </div>
  );
}

// 内部の関数たち
function IntBlock({ int, data }: { int: string; data: Record<string, string[]> }) {
  const intensityStyleMap: Record<string, { label: string; bg: string; text: string; border: string }> = {
    '1': { label: '1', bg: 'bg-sky-50 dark:bg-card-bg', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-500' },
    '2': { label: '2', bg: 'bg-lime-50 dark:bg-card-bg', text: 'text-lime-700 dark:text-lime-400', border: 'border-lime-200 dark:border-lime-500' },
    '3': { label: '3', bg: 'bg-yellow-50 dark:bg-card-bg', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-500' },
    '4': { label: '4', bg: 'bg-orange-50 dark:bg-card-bg', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-500' },
    '5-': { label: '5弱', bg: 'bg-red-50 dark:bg-card-bg', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-500' },
    '5+': { label: '5強', bg: 'bg-red-100 dark:bg-card-bg', text: 'text-red-800 dark:text-red-400', border: 'border-red-300 dark:border-red-600' },
    '6-': { label: '6弱', bg: 'bg-fuchsia-50 dark:bg-card-bg', text: 'text-fuchsia-700 dark:text-fuchsia-400', border: 'border-fuchsia-200 dark:border-fuchsia-500' },
    '6+': { label: '6強', bg: 'bg-fuchsia-100 dark:bg-card-bg', text: 'text-fuchsia-800 dark:text-fuchsia-400', border: 'border-fuchsia-300 dark:border-fuchsia-600' },
    '7': { label: '7', bg: 'bg-purple-100 dark:bg-card-bg', text: 'text-purple-900 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-600' },
  };

  const intData = intensityStyleMap[int] ?? {
    label: int,
    bg: 'bg-card-bg',
    text: 'text-main-text',
    border: 'border-border',
  };

  // 震度階級の判定
  const isNotable = int === '5-' || int === '5+';
  const isSevere = int === '6-' || int === '6+';
  const isExtreme = int === '7';

  // 震度に応じたグロー（外光）の設定
  const glowStyles: Record<string, string> = {
    '5-': 'shadow-[0_0_15px_-5px_rgba(239,68,68,0.2)] dark:shadow-[0_0_20px_-5px_rgba(239,68,68,0.1)]',
    '5+': 'shadow-[0_0_20px_-5px_rgba(220,38,38,0.25)] dark:shadow-[0_0_25px_-5px_rgba(220,38,38,0.15)]',
    '6-': 'shadow-[0_0_25px_-5px_rgba(192,38,211,0.3)] dark:shadow-[0_0_30px_-5px_rgba(192,38,211,0.2)]',
    '6+': 'shadow-[0_0_30px_-5px_rgba(192,38,211,0.4)] dark:shadow-[0_0_35px_-5px_rgba(192,38,211,0.3)]',
    '7': 'shadow-[0_0_40px_-5px_rgba(126,34,206,0.5)] dark:shadow-[0_0_50px_-5px_rgba(126,34,206,0.4)]',
  };

  return (
    <div className="relative">
      {/* グローレイヤー (Extremeのみ点滅) */}
      {(isNotable || isSevere || isExtreme) && (
        <div className={`absolute inset-0 rounded-xl ${glowStyles[int]} ${isExtreme ? 'animate-glow-pulse' : ''} pointer-events-none`} />
      )}
      
      {/* メインコンテンツカード */}
      <div className={`
        relative border-l-8 ${intData.border} ${intData.bg} p-6 rounded-r-xl transition-all duration-500
        ${(isNotable || isSevere || isExtreme) ? 'border-y border-r border-border/50' : 'shadow-sm border-y border-r border-transparent'}
        ${isExtreme ? 'ring-4 ring-purple-500/30' : ''}
      `}>
        <div className="flex items-center justify-between mb-4 border-b border-border/20 pb-2">
          <div className="flex items-center gap-3">
            <span className={`text-4xl font-black ${intData.text}`}>震度 {intData.label}</span>
            {isExtreme && <AlertTriangle className="text-purple-600" size={32} />}
          </div>
        </div>
        <div className="space-y-6">
          {Object.entries(data).map(([pref, cities]) => (
            <div key={pref}>
              <h3 className="text-lg font-black text-main-text opacity-80 mb-2">{pref}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {cities.map((city) => (
                  <span key={city} className="text-base font-medium text-main-text opacity-70 bg-background/50 px-3 py-1 rounded-md border border-border shadow-sm">{city}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
