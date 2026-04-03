import { groupByInt, formatDateTime } from './quakeUtil';
import type { Pref, Head as HeadType, Body as BodyType, Data } from './types';
import { useState, ReactNode } from 'react';

/**
 * 地震情報を表示するためのラベル付きボックスコンポーネント
 */
export function InfoBox({
  title,
  children,
  borderColor = 'border-border',
}: {
  title: string;
  children: ReactNode;
  borderColor?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 border-l-2 ${borderColor} pl-3 py-1 transition-colors`}>
      <p className="text-sm font-bold text-accent uppercase tracking-wide">{title}</p>
      <div className="text-2xl font-bold text-main-text">{children}</div>
    </div>
  );
}

/**
 * 詳細情報を並べるためのコンテナ
 */
export function DetailBox({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

/**
 * 震度一覧を表示するメインコンポーネント
...
 */
export function IntList({ data }: { data: Data }) {
  const prefs: Pref[] = data.Body.Intensity.Observation.Pref;

  // 震度ごとに都道府県・市区町村をグループ化
  const grouped = groupByInt(prefs);
  const intOrder = ['7', '6+', '6-', '5+', '5-', '4', '3', '2', '1'];

  const maxInt = intOrder.find((int) => grouped[int]);
  const needShowAll = Object.keys(grouped).length > 1;

  // 初期状態では最大震度のみ表示、ボタン押下ですべて表示
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

      {/* 複数震度がある場合に「すべて表示」ボタンを出す */}
      {!showAll && needShowAll && (
        <div className="mt-12 text-center border-t border-border pt-8 transition-colors">
          <button
            className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-3 bg-vipelar/10 text-vipelar px-8 py-3 rounded-2xl sm:rounded-full hover:bg-vipelar/20 transition-colors font-bold text-base leading-tight"
            onClick={() => setShowAll(true)}
          >
            <span>すべての観測地点を表示</span>
            <span className="opacity-80 text-sm sm:text-base">
              ({Object.keys(grouped).length} 階級)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * 地震情報のヘッダー（タイトル）
 */
export function Head({ data }: { data: HeadType }) {
  return (
    <h1 className="text-3xl md:text-5xl font-black text-main-text leading-tight tracking-tight transition-colors">
      {data.Title}
    </h1>
  );
}

/**
 * 地震の基本情報（震源地、深さ、マグニチュード等）
 */
export function Body({ data }: { data: BodyType }) {
  const earthquake = data.Earthquake;
  const depth = earthquake
    ? earthquake.Hypocenter.Depth === '0'
      ? 'ごく浅い'
      : `${earthquake.Hypocenter.Depth}km`
    : '---';

  const magnitude = earthquake
    ? earthquake.Magnitude === 'NaN'
      ? '不明'
      : `M${earthquake.Magnitude}`
    : '---';

  const hypocenterName = earthquake?.Hypocenter.Name || '---';

  const maxInt = data.Intensity.Observation.MaxInt;

  // 震度に応じたスタイルを取得
  const intStyle = getIntStyle(maxInt);
  // const intensityBorder = intStyle?.border || 'border-border';

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6">
        <InfoBox title="震源地">{hypocenterName}</InfoBox>
        <InfoBox title="最大震度">{intStyle?.label || maxInt}</InfoBox>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <InfoBox title="深さ">{depth}</InfoBox>
        <InfoBox title="マグニチュード">{magnitude}</InfoBox>
      </div>
      <InfoBox title="発生日時">
        {earthquake ? formatDateTime(earthquake.OriginTime) : '---'}
      </InfoBox>
      <div className="pt-6 mt-6 border-t border-border italic transition-colors opacity-70">
        <div suppressHydrationWarning>
          <InfoBox title="画面更新">{formatDateTime(new Date().toISOString())}</InfoBox>
        </div>
      </div>
    </div>
  );
}

/**
 * 各震度階級のカード
 * 震度に応じて配色や演出（グロー、アニメーション）を動的に切り替えます
 */
function IntBlock({ int, data }: { int: string; data: Record<string, string[]> }) {
  // 演出用のフラグ
  const isFilled = int === '5-' || int === '5+' || int === '6-' || int === '6+' || int === '7';
  const isExtreme = int === '7';

  const currentStyle = getIntStyle(int);

  // 外光（グロー）の設定。5弱以上で表示。7は黒と紫の強力なグロー。
  const glowStyles: Record<string, string> = {
    '5-': 'shadow-[0_0_15px_-5px_rgba(239,68,68,0.2)]',
    '5+': 'shadow-[0_0_20px_-5px_rgba(220,38,38,0.3)]',
    '6-': 'shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)]',
    '6+': 'shadow-[0_0_40px_-5px_rgba(190,18,60,0.6)]',
    '7': 'shadow-[0_0_60px_-10px_rgba(88,28,135,0.8),0_0_20px_0_rgba(0,0,0,1)]',
  };

  return (
    <div className="relative">
      {/* グローレイヤー (震度7のみ点滅) */}
      {isFilled && (
        <div
          className={`absolute inset-0 rounded-xl ${glowStyles[int]} ${isExtreme ? 'animate-glow-pulse' : ''} pointer-events-none`}
        />
      )}

      {/* メインコンテンツカード */}
      <div
        className={`
        relative border-l-8 ${currentStyle.border} ${currentStyle.bg} ${currentStyle.text} p-6 rounded-r-xl transition-all duration-500
        ${isFilled ? 'border-y border-r border-transparent' : 'border-y border-r border-border/50 shadow-sm'}
        ${isExtreme ? 'ring-2 ring-purple-600/50 ring-offset-2 ring-offset-black' : ''}
      `}
      >
        {/* 震度ラベル部分 */}
        <div
          className={`flex items-center justify-between mb-4 border-b pb-2 ${isFilled ? 'border-current/20' : 'border-border/20'}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black">震度 {currentStyle.label}</span>
          </div>
        </div>

        {/* 観測地域リスト */}
        <div className="space-y-6">
          {Object.entries(data).map(([pref, cities]) => (
            <div key={pref}>
              <h3
                className={`text-lg font-black mb-2 ${isFilled ? 'text-current opacity-90' : 'text-main-text opacity-80'}`}
              >
                {pref}
              </h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {cities.map((city) => (
                  <span
                    key={city}
                    className={`
                    text-base font-medium px-3 py-1 rounded-md border shadow-sm
                    ${
                      isFilled
                        ? 'bg-current/10 text-current border-current/20 backdrop-blur-sm'
                        : 'text-main-text opacity-70 bg-background/50 border-border'
                    }
                    ${isExtreme ? 'font-black tracking-tighter' : ''}
                  `}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getIntStyle(int: string) {
  // 震度ごとの配色定義
  // 1-4: 淡い色（背景同化）, 5-6: 塗りつぶし（警告）, 7: 特殊演出
  const intensityStyleMap: Record<
    string,
    { label: string; bg: string; text: string; border: string }
  > = {
    '1': {
      label: '1',
      bg: 'bg-slate-50 dark:bg-card-bg',
      text: 'text-slate-700 dark:text-sky-400',
      border: 'border-slate-200 dark:border-sky-600',
    },
    '2': {
      label: '2',
      bg: 'bg-sky-50 dark:bg-card-bg',
      text: 'text-sky-700 dark:text-lime-400',
      border: 'border-sky-100 dark:border-lime-600',
    },
    '3': {
      label: '3',
      bg: 'bg-blue-50 dark:bg-card-bg',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-500',
    },
    '4': {
      label: '4',
      bg: 'bg-amber-50 dark:bg-card-bg',
      text: 'text-amber-600 dark:text-amber-300',
      border: 'border-amber-100 dark:border-amber-400',
    },
    '5-': { label: '5弱', bg: 'bg-yellow-600', text: 'text-white', border: 'border-yellow-600' },
    '5+': { label: '5強', bg: 'bg-orange-600', text: 'text-white', border: 'border-orange-600' },
    '6-': { label: '6弱', bg: 'bg-red-700', text: 'text-white', border: 'border-red-700' },
    '6+': { label: '6強', bg: 'bg-rose-800', text: 'text-white', border: 'border-rose-800' },
    '7': {
      label: '7',
      bg: 'bg-gradient-to-br from-purple-950 via-black to-purple-950',
      text: 'text-white',
      border: 'border-black',
    },
  };

  return intensityStyleMap[int];
}
