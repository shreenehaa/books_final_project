import { role } from "../model/role.js";
import { users_details } from "../model/user-model.js";
import { userTokens } from "../model/userTokens.js";

async function insertUserService(userName, password, roleId) {
  try {
    return await users_details.create({ userName, password, roleId });
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

async function insertToken(userId, token) {
  return await userTokens.create({ userId, token });
}
async function updateAvatar(ans, userId) {
  return await users_details.update({ avatar: ans }, { where: { id: userId } });
}

async function getIdByToken(key) {
  return await userTokens.findOne({
    where: {
      token: key,
    },
  });
}
async function updateExpiry(id) {
  return await userTokens.update({ expiry: "yes" }, { where: { userId: id } });
}
async function getRoleIdByUserId(id) {
  return await users_details.findOne({ where: { id: id } });
}
async function getRoleName(id) {
  return await role.findOne({ where: { roleid: id } });
}

async function deleteProfileFunction(token) {
  const userSession = await userTokens.findOne({
    where: {
      token: token,
    },
  });
  const id = userSession.userId;
  console.log(id);

  const userRole = await users_details.findOne({
    where: {
      id: id,
    },
  });
  const rid = userRole.roleId;
  console.log("rid :" + rid);

  const userAccess = await role.findOne({
    where: {
      roleid: rid,
    },
  });

  // console.log("********", userAccess);
  const rname = userAccess.rolename;
  // console.log("rolename :" + rname);
  return rname;
}

async function deleteFunction(id) {
  return await users_details.destroy({
    where: {
      id: id,
    },
  });
}
export default {
  insertUserService,
  getUserService,
  getUserByName,
  updateAvatar,
  insertToken,
  updateAvatar,
  getIdByToken,
  updateExpiry,
  getRoleIdByUserId,
  getRoleName,
  deleteProfileFunction,
  deleteFunction,
};
