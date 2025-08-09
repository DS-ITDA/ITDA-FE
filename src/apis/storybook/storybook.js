import { axiosInstance } from '../axios';

// 스토리북 상세 조회
export const getStoryBook = async (storybookId) => {
  try {
    const response = await axiosInstance.get(`/api/storybook/${storybookId}`);

    return response.data;
  } catch (error) {
    console.error('getStoryBook 에러 발생', error);
  }
};
