import React from 'react';
import Layout from '@/layouts/Layout';
import Card from '@/components/Card';
import Text from '@/components/Text';

const HomePage: React.FC = () => {
  return (
    <Layout title="Home">
      <section className="mb-20 max-w-3xl">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
          Vipelarのおもちゃ箱
        </h1>
        <Text>
          Vipelarは、自分がほしいと思った小規模なWebアプリを作っている、気まぐれ開発室です。
        </Text>
        <Text>以下に現在公開中のメインプロジェクトをまとめています。</Text>
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
