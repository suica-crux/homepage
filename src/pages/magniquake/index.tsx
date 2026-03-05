import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Head, Body, IntList } from '@/lib/magniquake/Display';
import { GetPostData } from '@/lib/magniquake/getData';
import { ExternalLinkIcon } from 'lucide-react';
import type { Data } from '@/lib/magniquake/types';

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
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg animate-pulse">データを読み込み中...</p>
        </div>
      ) : data ? (
        <div className="w-full max-w-6xl">
          <div className="mb-8 border-b border-border pb-4 transition-colors">
            <Link to="/" className="text-accent hover:underline text-sm mb-2 block font-medium">
              &larr; Vipelarのおもちゃ箱
            </Link>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <Head data={data.Head} />
              <p className="text-gray-400 text-sm">Event ID: {data.Head.EventID}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-8">
            <div className="lg:col-span-1 bg-card-bg border border-border rounded-xl p-5 space-y-6 transition-colors shadow-sm">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider">基本情報</h2>
              <Body data={data.Body} />
            </div>
            
            <div className="lg:col-span-3 bg-card-bg border border-border rounded-xl p-5 transition-colors shadow-sm">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">各地の震度</h2>
              <IntList data={data} />
            </div>
          </div>

          <div className="text-center py-8 border-t border-border transition-colors">
            <a
              href="https://ntool.online/apidoc/earthquakeapi"
              className="text-gray-400 hover:text-accent text-sm inline-flex items-center gap-1 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Data Source: NTool Earthquake API
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-red-500">データの取得に失敗しました</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-blue-500 underline">
            再試行する
          </button>
        </div>
      )}
    </Layout>
  );
};

export default MagniquakePage;
