import userService from "../service/user-service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// import router from "../routes/books.routes.js";
// import { userTokens } from "../model/userTokens.js";
//  import path from "path";
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
  const NOT_AUTHORIZED = { msg: "you are not authorized" };
  const token = request.header("x-auth-token");
  const id = await userService.getIdByToken(token);
  console.log("iddddddddddddddddddddddd", id.userId);
  const role = await userService.getRoleIdByUserId(id.userId);
  console.log(role.roleId);
  const roleN = await userService.getRoleName(role.roleId);
  console.log("roleeeeeeee nameeeeeeeeeee", roleN.rolename);
  if (roleN.rolename == "admin" || roleN.rolename == "super user") {
    response.send(await userService.getUserService());
  } else {
    response.send(NOT_AUTHORIZED);
  }
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  const id = await userService.getIdByToken(token_key);

  console.log(id.userId);
  await userService.updateExpiry(id.userId);
  response.send("token expired");
}
// async function userPic(request, response) {
//   const imagePath = request.file.path;
//   var key = request.header("x-auth-token");

//   const ans = await userService.uploadImage(imagePath);
//   const id = await userService.getIdByToken(key);
//   await userService.updateAvatar(ans.secure_url, id.userId);
//   response.send({ imageURL: ans.secure_url, msg: "uploaded successfully" });
// }

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

export default {
  insertUser,
  getAllUser,
  login,
  logout,
  // userPic,
  deleteUser,
  uploadImage,
};
