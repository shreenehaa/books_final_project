import express from "express";
import userController from "../controller/user-controller.js";
import { auth } from "../middleWare/auth.js";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  // destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
const router = express.Router();
router.route("/").get(auth, userController.getAllUser);
router
  .route("/signup")

  .post(userController.insertUser);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
router.route("/pic").post(upload.single("avatar"), userController.userPic);
router.route("/:id").delete(auth, userController.deleteUser);
export default router;
