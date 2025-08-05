import HomeLayout from '@layouts/HomeLayout';
import { createBrowserRouter } from 'react-router-dom';
import { lazyRoutes } from './routes';
import React from 'react';

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      // 백엔드 경로 문제로 임시 주석 처리
      // { index: true, element: React.createElement(lazyRoutes.Home) },
      { path: 'main', element: React.createElement(lazyRoutes.Home) },
      { path: 'login', element: React.createElement(lazyRoutes.Login) },
      { path: 'ai', element: React.createElement(lazyRoutes.Ai) },
      { path: 'interview', element: React.createElement(lazyRoutes.Interview) },
      { path: 'createStory', element: React.createElement(lazyRoutes.CreateStory) },
      { path: 'createdStory/:id', element: React.createElement(lazyRoutes.CreatedStory) },
      { path: 'readStory/:id', element: React.createElement(lazyRoutes.ReadStory) },
      { path: 'editStory/:id', element: React.createElement(lazyRoutes.EditStory) },
      { path: 'view', element: React.createElement(lazyRoutes.View) },
      { path: 'mypage', element: React.createElement(lazyRoutes.Mypage) },
      // { path: 'oauth/success', element: React.createElement(lazyRoutes.LoginSuccess) },
      { path: '/', element: React.createElement(lazyRoutes.LoginSuccess) },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
