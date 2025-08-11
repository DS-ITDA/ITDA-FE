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

// 스토리북 저장
export const postStoryBook = async (storyId, photoId, title, spineColor) => {
  console.log(storyId, photoId, title, spineColor);

  try {
    const response = await axiosInstance.post('/api/storybook', {
      storyId,
      photoId,
      title,
      spineColor,
    });

    return response.data;
  } catch (error) {
    console.error('postStoryBook 에러 발생', error);
  }
};
