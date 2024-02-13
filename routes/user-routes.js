import express from "express";
import userController from "../controller/user-controller.js";
import { auth } from "../middleWare/auth.js";
const router = express.Router();
router
  .route("/")
  .get(auth, userController.getAllUser)
  .get(userController.getUsers);
router
  .route("/signup")

  .post(userController.insertUser);
router.route("/login").post(userController.login);
export default router;
