import userService from "../service/user-service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { userTokens } from "../model/userTokens.js";
async function genHashPassword(password) {
  const NO_OF_ROUND = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUND);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
async function insertUser(request, response) {
  console.log(request.body);
  const { userName, password, roleId } = request.body;

  if (password.length <= 8) {
    response
      .status(401)
      .send({ msg: "password should be more than 8 charachers" });
  } else {
    const hashedPassword = await genHashPassword(password);
    console.log(hashedPassword);
    response.send(
      await userService.insertUserService(userName, hashedPassword, roleId)
    );
  }
}

async function login(request, response) {
  const { userName, password } = request.body;
  const userFromDB = await userService.getUserByName(userName);
  console.log(userFromDB);
  if (!userFromDB) {
    response.status(401).send({ msg: "Invalid credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const ispasswordcheck = await bcrypt.compare(password, storedDBPassword);
    if (ispasswordcheck) {
      const token = jwt.sign({ id: userFromDB.id }, process.env.SECRET_KEY);
      userService.insertToken(userFromDB.id, token);

      response.send({ msg: "successful login", token });
    } else {
      response.status(401).send({ msg: "invalid credentials" });
    }
  }
}

async function getAllUser(request, response) {
  response.send(await userService.getUserService());
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  const id = await userService.getIdByToken(token_key);
  await userService.updateExpiry(id.userId);
  response.send("token expired");
}
async function userPic(request, response) {
  cloudinary.config({
    secure: true,
  });
  const uploadImage = async (imagePath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(cloudinary.config());

  (async () => {
    // Set the image to upload
    const imagePath = request.file.path;

    // Upload the image
    const ans = await uploadImage(imagePath);
    response.send({ imageURL: ans.secure_url, msg: "uploaded successfully" });
    // console.log("*****", publicId);
    var key = request.header("x-auth-token");
    console.log("key******************", key);
    const id = await userService.getIdByToken(key);
    console.log("userId##############", id);
    // Update the user's avatarURL in the database
    await userService.updateAvatar(ans.secure_url, id.userId);
    // console.log(req.file);
    // console.log(req.body);
    console.log("updated*****************");
  })();
}

async function deleteUser(request, response) {
  const token = request.header("x-auth-token");
  const { id } = request.params;

  const rolename = await userService.deleteProfileFunction(token);
  if (rolename == "super user") {
    console.log(id);
    const obj = await userService.deleteFunction(id);
    obj ? response.send("deleted") : response.status(404).send(NOT_FOUND_MSG);
  } else {
    response.send({ msg: "you do not have access" });
  }
}
export default {
  insertUser,
  getAllUser,
  login,
  logout,
  userPic,
  deleteUser,
};
