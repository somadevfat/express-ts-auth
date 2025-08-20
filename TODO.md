# バックエンド実装 TODO

## 概要
バックエンド仕様書（`memo/requirements/backend_spec.md`）に基づいて、実装が必要な機能を管理します。

## 実装済み機能
- ✅ ユーザー認証 (`POST /auth/signin`)
- ✅ ユーザー管理 (`GET, POST, PUT, DELETE /users`)
- ✅ JWTによるAPIエンドポイントの保護 (`verifyAuthToken` ミドルウェア)
- ✅ 管理者権限チェック (`isAdmin` ミドルウェア)
- ✅ クリーンアーキテクチャの基本構造 (`features/user`, `features/auth`)
- ✅ エラーハンドリングの基本構造

## 未実装機能（実装優先度順）

### 1. データベーススキーマ拡張 (最優先)
- [x] `prisma/schema.prisma`: `Item` モデルを追加する (商品名, 価格, 説明, 画像URLなど)
- [x] `prisma/schema.prisma`: `Cart`, `CartItem` モデルを追加し、`User` および `Item` とのリレーションを設定する
- [x] `prisma migrate dev` を実行し、データベースに変更を適用する

### 2. 認証機能の拡張
- [x] `POST /auth/admin/signin`: 管理者ログイン用のエンドポイントを実装する
- [x] `POST /auth/signout`: ログアウト機能を実装する

### 3. 商品管理機能 (要管理者権限)
- [ ] `Item` のクリーンアーキテクチャ（Domain, Application, Infrastructure）の基本構造を作成する
- [ ] `POST /items`: 商品を作成する
- [ ] `GET /items`: 商品一覧を取得する (ページネーション、フィルタ機能含む)
- [ ] `GET /items/{itemId}`: 商品詳細を取得する
- [ ] `PUT /items/{itemId}`: 商品情報を更新する
- [ ] `DELETE /items/{itemId}`: 商品を削除する

### 4. カート管理機能 (要ユーザー認証)
- [ ] `Cart` のクリーンアーキテクチャの基本構造を作成する
- [ ] `GET /carts`: ログインユーザーのカート情報を取得する
- [ ] `POST /carts`: カートに商品を追加する
- [ ] `DELETE /carts/items/{itemId}`: カートから商品を削除する

### 5. マイページ機能 (要ユーザー認証)
- [x] `GET /my/user`: ログインしているユーザー自身の情報を取得する

### 6. 品質向上タスク (低優先度)
- [ ] 各エンドポイントの入力値検証を強化する (zodなど)
- [ ] 単体テスト・統合テストを拡充する
- [ ] セキュリティ対策を強化する (CSRF, レート制限など)
