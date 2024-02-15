import express from "express";
import userController from "../controller/user-controller.js";
import { auth } from "../middleWare/auth.js";
import multer from "multer";
import path from "path";
import userService from "../service/user-service.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

router.route("/").get(auth, userController.getAllUser);
router
  .route("/signup")

  .post(userController.insertUser);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
router
  .route("/pic")
  .post(
    auth,
    upload.single("avatar"),
    async function userPic(request, response) {
      console.log(request);
      // console.log(request.body);
      console.log(request.file);
      const imagePath = request.file.path;

      var key = request.token;
      const ans = await userController.uploadImage(imagePath);
      const id = await userService.getIdByToken(key);
      await userService.updateAvatar(ans.secure_url, id.userId);
      response.send({ imageURL: ans.secure_url, msg: "uploaded successfully" });
    }
  );
router.route("/:id").delete(auth, userController.deleteUser);
export default router;
