import React from 'react';
import Layout from '@/layouts/Layout';
import Card from '@/components/Card';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <section className="mb-16 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Vipelarのおもちゃ箱</h1>
        <p className="text-lg text-main-text opacity-70 max-w-2xl leading-relaxed">
          Vipelarは、自分がほしいと思った小規模なWebアプリを作っている、気まぐれ開発室です。
          以下に現在公開中のメインプロジェクトをまとめています。
        </p>
      </section>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap -mx-2">
          <Card
            title="Magniquake"
            description="気象庁発表の「震度速報」、「震源に関する情報」、「震源・震度に関する情報」、「遠地地震に関する情報」を自分好みの画面で見たくなりました。"
            href="/magniquake"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
