import type { Metadata } from 'next';
import NotFoundChildren from './NotFoundChildren';

export const metadata: Metadata = {
  title: 'ページが見つかりません(404)',
};

export default function NotFound() {
  return <NotFoundChildren />;
}
