# 図書管理システム（TypeScript）

TypeScript で実装した図書管理システムです。  
フロントエンド（React + Vite）とバックエンド（Hono + Drizzle + SQLite）で構成されています。

## プロジェクト構成

- `frontend`: React / TypeScript の UI
- `backend`: Hono / TypeScript の REST API

## プログラム構成

```text
.
├── backend
│   ├── src
│   │   ├── db                # DB接続・スキーマ・seed
│   │   ├── middleware        # 認証・認可ミドルウェア
│   │   └── routes            # auth / books / rentals API
│   ├── drizzle               # マイグレーション
│   ├── drizzle.config.ts
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components        # レイアウトなど共通UI
│   │   ├── hooks             # 認証などのカスタムフック
│   │   ├── lib               # API 呼び出しユーティリティ
│   │   ├── pages             # 画面コンポーネント
│   │   ├── types             # 型定義
│   │   └── App.tsx
│   └── package.json
├── package.json              # ルート依存関係
└── README.md
```

## 技術スタック

### フロントエンド

- React
- TypeScript
- Vite
- React Router

### バックエンド

- Node.js
- TypeScript
- Hono
- Drizzle ORM
- SQLite
- Zod
- JWT 認証
- bcryptjs

## セットアップ

### 1. バックエンド

```bash
cd backend
npm install
```

`backend/.env` を作成して以下を設定します。

```env
DATABASE_URL=library.db
JWT_SECRET=your-secret-key
```

初期化:

```bash
npx drizzle-kit migrate
npx tsx src/db/seed.ts
```

起動:

```bash
npm run dev
```

デフォルト: `http://localhost:3000`

### 2. フロントエンド

```bash
cd frontend
npm install
npm run dev
```

デフォルト: `http://localhost:5173`

## 主な機能

- ユーザー登録・ログイン（JWT）
- 書籍一覧 / 検索 / 詳細
- 書籍の追加 / 更新 / 削除（ロール制御あり）
- 貸出一覧 / 自分の貸出一覧
- 貸出と返却処理（在庫連動）

## API（バックエンド）

### 認証

- `POST /api/auth/register`
- `POST /api/auth/login`

### 書籍

- `GET /api/books`
- `GET /api/books/search?q=xxx`
- `GET /api/books/:id`
- `POST /api/books`（ADMIN / STAFF）
- `PUT /api/books/:id`（ADMIN / STAFF）
- `DELETE /api/books/:id`（ADMIN）

### 貸出

- `GET /api/rentals`（ADMIN / STAFF）
- `GET /api/rentals/my`（全ロール）
- `POST /api/rentals`（全ロール）
- `PUT /api/rentals/:id/return`（全ロール）

## 初期ユーザー（seed）

- `admin / admin`（ADMIN）
- `staff / staff`（STAFF）
- `user / user`（USER）

## AI 利用に関する記録

このリポジトリでは、AI による実装利用は **UI の補装（見た目・使い勝手の磨き込み）に限定** しています。  
ドメイン設計、API 設計、業務ロジック実装の主要部分は学習目的で手動実装しています。
