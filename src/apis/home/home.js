import { axiosInstance } from '../axios';

// 스토리북 목록 조회
export const getStoryBookData = async () => {
  try {
    const response = await axiosInstance.get('/api/storybook');

    return response.data;
  } catch (error) {
    console.error('getStoryBook 에러 발생', error);
  }
};

// 사진 업로드
export const postPhotoUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/api/photo/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('postPhotoUpload 에러 발생', error);
  }
};

// AI 분석
export const postPhotoAnalyze = async (originalPhotoId, selectedFaceIds) => {
  try {
    const response = await axiosInstance.post('/api/photo/analyze', {
      originalPhotoId,
      selectedFaceIds,
    });

    return response.data;
  } catch (error) {
    console.error('postPhotoAnalyze 에러 발생', error);
  }
};
