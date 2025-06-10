import { ReactNode } from 'react';

// 日時フォーマット
export function formatDateTime(dateString: string | Date) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}年${month}月${day}日 ${hour}時${minute.toString().padStart(2, '0')}分`
}

// 現在時刻生成
export function nowJSTTime() {
  const date = new Date();
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
}

// Reactコンポーネント
export function InfoBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p>{title}</p>
      <div className="bg-gray-100 border-gray-300 border-2 p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
}
