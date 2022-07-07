import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
export const IMG_PATH = 'http://localhost:8000';
export const customAxios = async (url, method, data) => {
   try {
      const response = await axios({
         url,
         method,
         data,
         headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IkF1dGhvcml0eS5ST0xFX1VTRVIiLCJleHAiOjE2NTcxOTYxNTh9.3_iKM5pPKHYtXtdfzcWrQYE2boH-zyyCTX7Ae-kvQZLFfGpY7Wr4OIeJ0P_n6njioYuOLeH0ibqdmaZC_yBW9A`,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error.response.data);
   }
};

export const fileAxios = async (url, method, data) => {
   try {
      const response = await axios({
         url,
         method,
         data,
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error.response.data);
   }
};
