import React from 'react';
import Layout from '@/layouts/Layout';
import { Link } from 'react-router-dom';

// 震度ブロックのコンポーネントを直接インポート
// (Display.tsx から IntBlock を export する必要がありますが、まずはページ側で再現または Display.tsx を調整します)
import { IntList } from '@/lib/magniquake/Display';
import type { Data } from '@/lib/magniquake/types';

const mockData: Data = {
  Control: {
    Title: 'プレビュー',
    DateTime: '',
    Status: '',
    EditorialOffice: '',
    PublishingOffice: '',
  },
  Head: {
    Title: '全震度カラープレビュー',
    ReportDateTime: '',
    TargetDateTime: '',
    EventID: 'preview',
    InfoType: '',
    Serial: '',
    InfoKind: '',
    InfoKindVersion: '',
    Headline: '',
  },
  Body: {
    Earthquake: {
      OriginTime: new Date().toISOString(),
      ArrivalTime: '',
      Hypocenter: {
        Name: 'カラーテスト震源地',
        Code: '',
        Depth: '10',
        Latitude: '',
        Longitude: '',
        Coordinate: '',
      },
      Magnitude: '7.0',
      Magnitude_description: '',
    },
    Intensity: {
      Observation: {
        MaxInt: '7',
        Pref: [
          {
            Name: 'テスト都道府県',
            Code: '',
            MaxInt: '7',
            Area: [
              {
                Name: 'テストエリア',
                Code: '',
                MaxInt: '7',
                City: [
                  { Name: '震度7地点', Code: '', MaxInt: '7', IntensityStation: [] },
                  { Name: '震度6強地点', Code: '', MaxInt: '6+', IntensityStation: [] },
                  { Name: '震度6弱地点', Code: '', MaxInt: '6-', IntensityStation: [] },
                  { Name: '震度5強地点', Code: '', MaxInt: '5+', IntensityStation: [] },
                  { Name: '震度5弱地点', Code: '', MaxInt: '5-', IntensityStation: [] },
                  { Name: '震度4地点', Code: '', MaxInt: '4', IntensityStation: [] },
                  { Name: '震度3地点', Code: '', MaxInt: '3', IntensityStation: [] },
                  { Name: '震度2地点', Code: '', MaxInt: '2', IntensityStation: [] },
                  { Name: '震度1地点', Code: '', MaxInt: '1', IntensityStation: [] },
                ],
              },
            ],
          },
        ],
      },
    },
    Comments: { Observation: '' },
  },
};

const PreviewPage: React.FC = () => {
  return (
    <Layout title="Intensity Preview">
      <div className="w-full max-w-6xl">
        <div className="mb-8 border-b border-border pb-4">
          <Link
            to="/magniquake"
            className="text-accent hover:underline text-sm mb-2 block font-medium"
          >
            &larr; Magniquakeに戻る
          </Link>
          <h1 className="text-4xl font-black text-main-text">震度表示プレビュー</h1>
          <p className="text-gray-500 mt-2">すべての震度階級の配色を確認するためのページです。</p>
        </div>

        <div className="bg-card-bg border border-border rounded-xl p-8 shadow-sm">
          <IntList data={mockData} />
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          右上のスイッチでライト/ダークを切り替えて確認してください。
        </div>
      </div>
    </Layout>
  );
};

export default PreviewPage;
