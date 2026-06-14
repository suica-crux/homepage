import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { ArrowUpRight } from 'lucide-react';
import Text from '@/components/Text';

const NotFoundPage: React.FC = () => {
  return (
    <Layout title="404">
      <section className="max-w-3xl">
        <Text type="error">404</Text>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
          ページが見つかりません
        </h1>
        <p className="text-lg text-main-text opacity-70 leading-relaxed text-pretty mb-12">
          お探しのページは存在しないか、移動・削除された可能性があります。
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-main-text hover:text-accent transition-colors"
        >
          トップページへ戻る
          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
