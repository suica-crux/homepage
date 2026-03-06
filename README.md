# Vipelarのおもちゃ箱 (Vipelar's Toy Box)

Vipelarが「自分がほしい」と思った小規模なWebアプリを制作・公開している、気まぐれ開発室のポータルサイトです。

## 公開中のプロジェクト

### Magniquake

気象庁が発表する地震情報（震度速報、震源に関する情報、震源・震度に関する情報、遠地地震に関する情報）を、自分好みのレイアウトで表示するだけのアプリケーションです。

## フレームワーク

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vite.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 開発用コマンド

プロジェクトのルートディレクトリで以下のコマンドを実行しましょう。

| コマンド       | 内容                           |
| :------------- | :----------------------------- |
| `pnpm install` | 依存関係のインストール         |
| `pnpm dev`     | 開発サーバーの起動             |
| `pnpm build`   | 本番用ビルド                   |
| `pnpm preview` | ビルドしたファイルのプレビュー |
| `pnpm lint`    | ESLintのコード確認             |
| `pnpm format`  | Prettierによるコード整形       |

## ディレクトリ構造

```text
/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   │   └── magniquake/
│   ├── pages/
│   └── styles/
└── vite.config.ts
```

## 作者

**Vipelar**

- GitHub: [@Vipelar](https://github.com/Vipelar)
