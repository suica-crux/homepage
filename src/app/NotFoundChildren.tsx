'use client';

import Link from 'next/link';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundChildren() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        {/* <h1 className="text-6xl font-bold text-red-400">Error: 404</h1> */}
        <Heading
          warn={true}
          title="404"
          subtitle="指定されたページは広大な宇宙のどこを探してもありませんでした。URLを確認してください。"
        />
        <Text colour="gray" className="mt-4">
          URLの送信者または
          <Link href="/contact" className="text-blue-500 hover:text-blue-700">
            管理者に問い合わせて
          </Link>
          ください。
        </Text>
        <Text>{countdown}&nbsp;秒後にトップーページに帰還します</Text>
        <Text>
          自動で戻らない場合:
          <Link
            href="/"
            className="inline-block mt-2 text-blue-500 hover:text-blue-700"
          >
            &nbsp;トップページに戻る
          </Link>
        </Text>
      </div>
    </div>
  );
}
