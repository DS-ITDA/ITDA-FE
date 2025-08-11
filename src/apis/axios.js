import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axiosInstance.post(
            '/api/auth/refresh',
            {},
            {
              headers: {
                'X-Refresh-Token': refreshToken,
              },
            },
          );

          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          const newRefreshToken = response.data.refreshToken;
          localStorage.setItem('refreshToken', newRefreshToken);

          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log('토큰 갱신 성공');

          return axiosInstance(error.config);
        } catch (refreshTokenError) {
          console.log('refreshToken으로 토큰 갱신 실패: ', refreshTokenError);

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
