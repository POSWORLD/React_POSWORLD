import axios from 'axios';
import { customAxios } from '../http/CustomAxios';

export const loginApi = async user => {
   console.log(user);
   try {
      const response = await axios({
         url: 'http://localhost:9007/auth/login',
         method: 'post',
         data: user,
      });

      return {
         isLogin: response.data.accessToken ? true : false,
         user: response.data,
      };
   } catch {
      return { isLogin: false };
   }
};

export const loginCheckApi = async () => {
   try {
      const response = await axios({
         url: 'http://localhost:9007/member/me',
         method: 'get',
         headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IkF1dGhvcml0eS5ST0xFX1VTRVIiLCJleHAiOjE2NTcxOTAzNzZ9.HrbCumlOPmWSKQg5zK84Jr_8ayJYtN7qUh2PdTfoz6EP1qc5zJlPC60UdmNHjrlZQNOv6Vr2RzxHOCCPQjT7uA`,
         },
      });
      return response.data;
   } catch {
      return;
   }
};

export const idCheckApi = async user => {
   const response = await axios({
      url: 'http://localhost:9007/auth/checkId',
      method: 'post',
      data: user,
   });
   return response.data;
};

export const insertUserApi = async user => {
   return await customAxios('/auth/signup', 'post', user);
};

export const updateUserApi = async user => {
   const response = await axios({
      url: 'http://localhost:9007/member/name',
      method: 'post',
      data: user,
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return response.data;
};

export const getUserCountApi = async () => {
   const response = await axios({
      url: 'http://localhost:9007/member/count',
      method: 'get',
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return response.data;
};

export const logoutApi = async userId => {
   return true;
};

export const getUserApi = async id => {
   const response = await axios({
      url: `http://localhost:9007/member/${id}`,
      method: 'get',
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return response.data;
};

export const deleteUserApi = async id => {
   const response = await axios({
      url: `http://localhost:9007/member/${id}`,
      method: 'delete',
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return response.data;
};
