import React, { useEffect, useState } from 'react';
import Layout from '@/layouts/Layout';
import { Head, Body, IntList } from './lib/Display';
import { GetPostData } from './lib/getData';
import { ExternalLinkIcon } from 'lucide-react';
import type { Data } from './lib/types';

const MagniquakePage: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPostData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <Layout title="Magniquake">
      {loading ? (
        <p>読み込み中...</p>
      ) : data ? (
        <>
          <h1 className="text-4xl font-bold mb-4">Magniquake</h1>
          <div className="bg-gray-200 p-4 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow space-y-4 mb-4">
            <Head data={data.Head} />
            <Body data={data.Body} />
            <IntList data={data} />
          </div>
          <div className="text-center">
            <a
              href="https://ntool.online/apidoc/earthquakeapi"
              className="underline inline-flex items-center gap-1"
              target="_blank"
              rel="noreferrer"
            >
              API
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>
        </>
      ) : (
        <p>データ取得に失敗しました</p>
      )}
    </Layout>
  );
};

export default MagniquakePage;
