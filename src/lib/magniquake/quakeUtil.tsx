import type { ReactNode } from 'react';
import type { Pref } from './types';

// 日時フォーマット
export function formatDateTime(dateString: string | Date) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${month}/${day} ${hour}:${minute.toString().padStart(2, '0')}`;
}

// 現在時刻生成
export function nowJSTTime() {
  const date = new Date();
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
}

// 情報を並べるためのシンプルなボックス
export function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-gray-100 pl-3 py-1">
      <p className="text-sm font-bold text-second-light uppercase tracking-wide">{title}</p>
      <div className="text-2xl font-bold text-dark">{children}</div>
    </div>
  );
}

// 震度リストを表示するためのInfoBox（詳細用）
export function DetailBox({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
}

// データ処理
export function groupByInt(prefs: Pref[]) {
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
