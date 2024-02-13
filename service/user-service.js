import { users_details } from "../model/user-model.js";
async function insertUserService(userName, password) {
  try {
    return await users_details.create({ userName, password });
  } catch (err) {
    return { msg: err.errors.map((val) => val.message).join() };
  }
}
async function getUserByName(userName) {
  try {
    return await users_details.findOne({
      where: {
        userName,
      },
    });
  } catch (err) {
    return { msg: err.errors.map((val) => val.message).join() };
  }
}

async function getUserService() {
  return await users_details.findAll();
}

async function searchFunction(search) {
  const searchResult = (await Register.findAll()).filter((obj) => {
    var temp = obj.toJSON();
    for (let key in temp) {
      if (typeof temp[key] === "string" && temp[key].includes(search)) {
        var temp1 = temp;
      }
    }
    return temp1;
  });

  return searchResult;
}
export default {
  insertUserService,
  getUserService,
  getUserByName,
  searchFunction,
};
