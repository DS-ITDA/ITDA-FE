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
  try {
    const response = await axiosInstance.put(`/api/mypage/people/${faceId}/name`, {
      name,
    });

    return response.data;
  } catch (error) {
    console.error('patchName 에러 발생', error);
  }
};

// 특정 인물 삭제
export const deletePeople = async (faceId) => {
  try {
    const response = await axiosInstance.delete(`/api/mypage/characters/${faceId}`);

    return response.data;
  } catch (error) {
    console.error('deletePeople 에러 발생', error);
  }
};

// 인물 병합
export const mergePeople = async (faceIds) => {
  try {
    const response = await axiosInstance.post('/api/mypage/characters/merge', {
      faceIds,
    });

    return response.data;
  } catch (error) {
    console.error('mergePeople 에러 발생', error);
  }
};

// 특정 인물 상세 조회
export const getDetailPeople = async (characterId) => {
  try {
    const response = await axiosInstance.get(`/api/mypage/characters/${characterId}`);

    return response.data;
  } catch (error) {
    console.error('getDetailPeople 에러 발생', error);
  }
};

// 특정 인물과 스토리북 연결 해제
export const deleteConnection = async (characterId, storybookId) => {
  try {
    const response = await axiosInstance.delete(`/api/mypage/characters/${characterId}/storybooks/${storybookId}`);

    return response.data;
  } catch (error) {
    console.error('deleteConnection 에러 발생', error);
  }
};
