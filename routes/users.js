const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//userの一覧を取得
router.get("/", userController.getAllUsers);
//idで指定したuserを取得
router.get("/:id", userController.getUserById);
//userの新規登録
router.post("/", userController.createUser);
//idで指定したuser情報を更新
router.put("/:id", userController.updateUser);
//idで指定したuser情報を削除
router.delete("/:id", userController.deleteUser);

module.exports = router;
