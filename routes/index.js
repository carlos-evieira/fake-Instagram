const express = require("express");
const router = express.Router();
const multer = require("multer")

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

const authMiddleware = require("../middlewares/auth");
const upload = require ('../configs/uploads')


router.get("/", authController.create);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/registro", userController.create);
router.post("/registro", userController.store);

router.get("/publicar", authMiddleware, postController.create);
router.post("/publicar", upload.single('photo'),  postController.store);

router.get("/home", authMiddleware, postController.index);

module.exports = router;
