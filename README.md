# 図書管理システム — バックエンド API

TypeScript + Hono + Drizzle ORM で構築した図書管理システムの REST API。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| ランタイム | Node.js |
| 言語 | TypeScript |
| Web フレームワーク | Hono |
| ORM | Drizzle ORM |
| データベース | SQLite (better-sqlite3) |
| バリデーション | Zod |
| 認証 | JWT (Hono 組み込み) |
| パスワードハッシュ | bcryptjs |
| リンター / フォーマッター | Biome |

## セットアップ

```bash
cd backend
npm install
```

### 環境変数

`backend/.env` を作成し、以下を記述:

```
DATABASE_URL=library.db
JWT_SECRET=your-secret-key
```

### データベース初期化

```bash
npx drizzle-kit migrate
npx tsx src/db/seed.ts
```

### 開発サーバー起動

```bash
npx tsx watch src/index.ts
```

サーバーが `http://localhost:3000` で起動します。

## API エンドポイント

### 認証

| メソッド | URL | 説明 | 認証 |
|---|---|---|---|
| POST | `/api/auth/register` | ユーザー登録 | 不要 |
| POST | `/api/auth/login` | ログイン（JWT トークン取得） | 不要 |

### 書籍

| メソッド | URL | 説明 | 認可 |
|---|---|---|---|
| GET | `/api/books` | 一覧取得 | 全ロール |
| GET | `/api/books/search?q=xxx` | 検索 | 全ロール |
| GET | `/api/books/:id` | 詳細取得 | 全ロール |
| POST | `/api/books` | 追加 | ADMIN / STAFF |
| PUT | `/api/books/:id` | 更新 | ADMIN / STAFF |
| DELETE | `/api/books/:id` | 削除 | ADMIN |

### 貸出

| メソッド | URL | 説明 | 認可 |
|---|---|---|---|
| GET | `/api/rentals` | 貸出一覧 | ADMIN / STAFF |
| GET | `/api/rentals/my` | 自分の貸出一覧 | 全ロール |
| POST | `/api/rentals` | 貸出手続き | 全ロール |
| PUT | `/api/rentals/:id/return` | 返却手続き | 全ロール |

## 初期ユーザー

| ユーザー名 | パスワード | ロール |
|---|---|---|
| admin | admin | ADMIN |
| staff | staff | STAFF |
| user | user | USER |

## ディレクトリ構成

```
backend/
├── src/
│   ├── index.ts            # エントリーポイント + CORS設定
│   ├── db/
│   │   ├── index.ts        # DB接続
│   │   ├── schema.ts       # Drizzleスキーマ定義
│   │   └── seed.ts         # 初期データ投入
│   ├── routes/
│   │   ├── auth.ts         # 認証API
│   │   ├── books.ts        # 書籍API
│   │   └── rentals.ts      # 貸出API
│   └── middleware/
│       └── auth.ts         # 認証・認可ミドルウェア
├── drizzle/                # マイグレーションファイル
├── drizzle.config.ts
├── tsconfig.json
├── biome.json
└── package.json
```
