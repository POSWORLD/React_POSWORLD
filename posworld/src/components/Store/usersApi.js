import axios from 'axios';

export const checkId = async (users, userId) => {
   const isCheckId = (await users.find(user => user.userId === userId)) ? true : false;
   return isCheckId;
};
/* export const checkId = async (users, userId) => {
    const isCheckId = {userId:userId.value};
    const response = await axios({
       method:'post',
       data: isCheckId,
       url : "http://localhost:8001/checkId"
   });
   return 
 }*/

export const loginApi = async (users, user) => {
   const newUser = { ...user, userId: user.userId, id: null };
   const response = await axios({
      method: 'post',
      data: newUser,
      url: 'http://localhost:8001/login',
   });
   console.log(response.data.token);
   return { isLogin: response.data.token ? true : false, user: response.data };
};
export const postUser = async (users, user) => {
   const newUser = { ...user, userId: user.userId, id: users.length };
   const response = await axios({
      method: 'post',
      data: newUser,
      url: 'http://localhost:8001/',
   });
   console.log(response);
   return [...users, newUser];
};
