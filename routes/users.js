const express = require("express"); // Express をインポート（ルーティングのため）
const userController = require("../controllers/userController"); // ユーザー関連のコントローラーをインポート

const router = express.Router(); // Express のルーターを作成

/**
 * ユーザー API のルート定義
 * - `/api/users` に関連するエンドポイントを定義
 */

// ユーザーの一覧を取得（GET /api/users）
router.get("/", userController.getAllUsers);

// ID で指定したユーザーを取得（GET /api/users/:id）
router.get("/:id", userController.getUserById);

// 新しいユーザーを登録（POST /api/users）
router.post("/", userController.createUser);

// ID で指定したユーザー情報を更新（PUT /api/users/:id）
router.put("/:id", userController.updateUser);

// ID で指定したユーザー情報を削除（DELETE /api/users/:id）
router.delete("/:id", userController.deleteUser);

// ルーターをエクスポートし、他のファイルで使用できるようにする
module.exports = router;
