import IntBlock from './IntBlock';
import { InfoBox } from './quakeUtil';
import type { Pref } from './types';
import { useState } from 'react';

export default function IntList({ prefs }: { prefs: Pref[] }) {
  const grouped = groupByInt(prefs);
  const intOrder = ['7', '6+', '6-', '5+', '5-', '4', '3', '2', '1'];

  // 🔥 最大震度を取得
  const maxInt = intOrder.find((int) => grouped[int]);

  // 🔘 表示切り替え用のステート（最大震度以外の表示）
  const [showAll, setShowAll] = useState(false);

  return (
    <InfoBox title="各地の震度">
      {intOrder
        .filter((int) => grouped[int]) // 存在する震度だけ
        .filter((int) => showAll || int === maxInt) // 最大震度だけ or 全部
        .map((int) => (
          <IntBlock key={int} int={int} data={grouped[int]} />
        ))}

      {/* 🧩 トグルボタン */}
      {!showAll && (
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

function groupByInt(prefs: Pref[]) {
  const result: Record<string, Record<string, string[]>> = {};

  prefs.forEach((pref) => {
    const prefName = pref.Name;

    pref.Area.forEach((area) => {
      area.City.forEach((city) => {
        const int = city.MaxInt;

        if (!result[int]) result[int] = {};
        if (!result[int][prefName]) result[int][prefName] = [];

        result[int][prefName].push(city.Name);
      });
    });
  });

  return result;
}
