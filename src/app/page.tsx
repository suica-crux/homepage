import Card from '@/components/Card';

export default function HomePage() {
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap -mx-2">
          <Card
            title="Magniquake"
            description="気象庁発表の「震度速報」、「震源に関する情報」、「震源・震度に関する情報」、「遠地地震に関する情報」をリアルタイムで取得して表示するアプリです。"
            href="app/magniquake/"
          />
        </div>
      </div>
    </div>
  );
}
