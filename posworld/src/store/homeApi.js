import { customAxios } from '../http/CustomAxios';
export const updateHomeApi = async (home) => {
    try {
        const response = await customAxios('/home/', 'put', home);
        return response;
    } catch (error) {
        throw error;
    }
};
