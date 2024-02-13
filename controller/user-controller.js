import userService from "../service/user-service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function genHashPassword(password) {
  const NO_OF_ROUND = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUND);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
async function insertUser(request, response) {
  console.log(request.body);
  const { userName, password } = request.body;

  if (password.length <= 8) {
    response
      .status(401)
      .send({ msg: "password should be more than 8 charachers" });
  } else {
    const hashedPassword = await genHashPassword(password);
    console.log(hashedPassword);
    response.send(
      await userService.insertUserService(userName, hashedPassword)
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
      const token = await jwt.sign(
        { id: userFromDB.id },
        process.env.SECRET_KEY
      );
      response.send({ msg: "successful login", token });
    } else {
      response.status(401).send({ msg: "invalid credentials" });
    }
  }
}

async function getAllUser(request, response) {
  response.send(await userService.getUserService());
}

async function getUsers(request, response) {
  console.log(request.query);
  if (request.query.search) {
    response.send(await userService.searchFunction(request.query.search));
  } else {
    response.send(await userService.getAllUser());
  }
}
export default { insertUser, getAllUser, login, getUsers };
