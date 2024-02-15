import jwt from "jsonwebtoken";
import { userTokens } from "../model/userTokens.js";
const auth = async (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    jwt.verify(token, process.env.SECRET_KEY);
    const tokenCheck = await userTokens.findOne({
      where: {
        token: token,
        expiry: "no",
      },
    });
    if (tokenCheck) {
      request.token = token;
      next();
    } else {
      response.status(401).send({ msg: "Login expired" });
    }
  } catch (err) {
    response.status(401).send({ msg: err.message });
  }
};
export { auth };
