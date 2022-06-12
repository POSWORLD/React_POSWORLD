import axios from "axios";
import { customAxios } from "../http/CustomAxios";

export const loginApi = async (user) => {
  try {
    const response = await axios({
      url: "http://localhost:8001/user/login",
      method: "post",
      data: user,
    });

    return { isLogin: response.data.token ? true : false, user: response.data };
  } catch {
    return { isLogin: false };
  }
};

export const loginCheckApi = async () => {
  try {
    const response = await axios({
      url: "http://localhost:8001/user/loginCheck",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch {
    return false;
  }
};

export const idCheckApi = async (user) => {
  const response = await axios({
    url: "http://localhost:8001/user/idCheck",
    method: "post",
    data: user,
  });
  return response.data;
};

export const postUser = async (user) => {
  return await customAxios("/user/join", "post", user);
};

// export const getUserById = async (id) => {
//   return await customAxios(`/user/${id}`, "get");
// };

// export const getUserByUserId = async (users, userId) => {
//   const findUserByUserId = await users.find((user) => user.userId === userId);
//   return findUserByUserId;
// };

// export const logoutApi = async (userId) => {
//   return true;
// };

// export const getUserByKey = async (users, key) => {
//   const findUserByUserId = await users.find((user) => key.test(user.name));
//   return findUserByUserId;
// };
