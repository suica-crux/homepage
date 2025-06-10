import { Metadata } from 'next';
import NotFoundChildren from './NotFoundChildren';

export const metadata: Metadata = {
  title: 'ページが見つかりません(404) - 同志社高校地学部',
};

export default function NotFound() {
  return <NotFoundChildren />;
}
