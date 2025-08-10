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

// 특정 인물 이름 수정
export const putName = async (faceId, name) => {
  console.log(faceId, name);

  try {
    const response = await axiosInstance.put(`/api/mypage/people/${faceId}/name`, {
      name,
    });

    return response.data;
  } catch (error) {
    console.error('patchName 에러 발생', error);
  }
};
