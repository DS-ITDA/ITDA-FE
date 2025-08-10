import { axiosInstance } from '../axios';

// 스토리북 리스트 조회
export const getPeople = async () => {
  try {
    const response = await axiosInstance.get('/api/mypage/people');

    return response.data;
  } catch (error) {
    console.error('getPeople 에러 발생', error);
  }
};
