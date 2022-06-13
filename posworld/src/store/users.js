import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { idCheckApi, loginApi, loginCheckApi, postUser } from "./usersApi";

const initialState = {
  myToken: localStorage.getItem("token"),
  isLogin: localStorage.getItem("token") === undefined ? true : false,
  me: {},
};

const LOGIN = "LOGIN";
const LOGIN_CHECK = "LOGIN_CHECK";
const CHECK_ID = "CHECK_ID";
const INSERT_USER = "INSERT_USER";
const SELECT_USER_BY_ID = "SELECT_USER_BY_ID";
const SELECT_USER_BY_USERID = "SELECT_USER_BY_USERID";
const LOGOUT = "LOGOUT";
const UPDATE_USERS = "UPDATE_USERS";
const SELECT_USER_BY_KEY = "SELECT_USER_BY_KEY";

export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
  return await loginApi(user);
});

export const loginCheck = createAsyncThunk(LOGIN_CHECK, async () => {
  return await loginCheckApi();
});

export const idCheck = createAsyncThunk(CHECK_ID, async (user) => {
  return await idCheckApi(user);
});

export const insertUser = createAsyncThunk(INSERT_USER, async (user) => {
  return await postUser(user);
});

// export const selectUserById = createAsyncThunk(
//   SELECT_USER_BY_ID,
//   async (id, thunkAPI) => {
//     const { users } = thunkAPI.getState().users;
//     const newUser = await getUserById(users, id);
//     return newUser;
//   }
// );
// export const selectUserByUserId = createAsyncThunk(
//   SELECT_USER_BY_USERID,
//   async (id, thunkAPI) => {
//     const { users } = thunkAPI.getState().users;
//     const newUser = await getUserByUserId(users, id);
//     return newUser;
//   }
// );

// export const selectUserByKey = createAsyncThunk(
//   SELECT_USER_BY_KEY,
//   async (key, thunkAPI) => {
//     const { users } = thunkAPI.getState().users;
//     const reg = new RegExp(key, "g");
//     const newUsers = await getUserByKey(users, reg);

//     return newUsers.id;
//   }
// );

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload.isLogin) {
          localStorage.setItem("token", payload.user.token);
          return { ...state, isLogin: payload.login, me: payload.user };
        } else {
          return { ...state, isLogin: false };
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        console.log(payload);
        return { ...state, isLogin: false };
      })
      .addCase(loginCheck.fulfilled, (state, { payload }) => {
        if (payload) {
          return { ...state, isLogin: true };
        } else {
          return { ...state, isLogin: false };
        }
      })
      .addCase(loginCheck.rejected, (state, { payload }) => {
        return { ...state, isLogin: false };
      })
      .addCase(insertUser.fulfilled, (state, { payload }) => {
        return { ...state, users: payload };
      });
    // .addCase(logout.fulfilled, (state, { payload }) => {
    //   localStorage.removeItem("token");
    //   return { ...state, isLogin: false, me: {}, myId: "" };
    // })
    // .addCase(updateUsers.fulfilled, (state, { payload }) => {
    //   const { newUsers, user } = payload;
    //   return { ...state, me: { ...state.me, ...user }, users: newUsers };
    // });
  },
});

// export const logout = createAsyncThunk(LOGOUT, async (payload, thunkAPI) => {
//   const { myId } = thunkAPI.getState().users;
//   const isLogout = await logoutApi(myId);
//   return isLogout;
// });

export const putUsers = async (users, user, id) => {
  const findUsersIndex = await users.findIndex((user) => user.id === id);
  const { name, img } = user;
  if (findUsersIndex === -1) {
    console.error("not found");
    return;
  }
  const newUsers = [...users];
  newUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
  return newUsers;
};

export const updateUsers = createAsyncThunk(
  UPDATE_USERS,
  async (user, thunkAPI) => {
    const { myId, users } = thunkAPI.getState().users;
    const newUsers = await putUsers(users, user, myId);
    return { newUsers, user };
  }
);

export default usersSlice.reducer;
