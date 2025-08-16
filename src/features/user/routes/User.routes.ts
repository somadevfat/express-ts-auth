import { Router } from "express";

const router = Router();

// ユーザー一覧取得
router.get("/users", (req, res) => {
  // 今は仮で空の配列を返します
  res.json([]);
});

// ユーザー取得
router.get("/users/:id", (req, res) => {
  // 今は仮で空のオブジェクトを返します
  res.json({});
});

// ユーザー作成
router.post("/users", (req, res) => {
  // 今は仮で空のオブジェクトを返します
  res.json({});
});

// ユーザー更新
router.put("/users/:id", (req, res) => {
  // 今は仮で空のオブジェクトを返します
  res.json({});
});

// ユーザー削除
router.delete("/users/:id", (req, res) => {
  // 今は仮でステータスコード204を返します
  res.status(204).send();
});

export default router;
