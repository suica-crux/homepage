import React from 'react';
import Layout from '@/layouts/Layout';
import Card from '@/components/Card';

const HomePage: React.FC = () => {
  return (
    <Layout title="Home">
      <section className="mb-20 max-w-3xl">
        <p className="text-sm font-bold text-accent tracking-widest mb-4">Vipelar's toy box</p>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
          おもちゃ箱
        </h1>
        <p className="text-lg text-main-text opacity-70 leading-relaxed text-pretty">
          Vipelarは、自分がほしいと思った小規模なWebアプリを作っている、気まぐれ開発室です。</p><p className="text-lg text-main-text opacity-70 leading-relaxed text-pretty">
          以下に現在公開中のメインプロジェクトをまとめています。
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-main-text opacity-40 tracking-widest mb-2">
          Projects
        </h2>
        <div className="border-t border-border">
          <Card
            index={1}
            title="Magniquake"
            description="気象庁発表の「震度速報」、「震源に関する情報」、「震源・震度に関する情報」、「遠地地震に関する情報」を自分好みの画面で見たくなりました。"
            href="/magniquake"
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
