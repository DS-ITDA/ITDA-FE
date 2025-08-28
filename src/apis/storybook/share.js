import { axiosInstance } from '../axios';

// 공유 링크 생성
export const postShare = async (id, password) => {
  try {
    const response = await axiosInstance.post(`/api/storybook/${id}/share/start`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error('postShare 에러 발생', error);
  }
};

// 공유 종료
export const deleteShare = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/storybook/${id}/share`);

    return response.data;
  } catch (error) {
    console.error('deleteShare 에러 발생', error);
  }
};
