import HomeLayout from '@layouts/HomeLayout';
import { createBrowserRouter } from 'react-router-dom';
import { lazyRoutes } from './routes';
import React from 'react';

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: React.createElement(lazyRoutes.Home) },
      { path: 'login', element: React.createElement(lazyRoutes.Login) },
      { path: 'ai', element: React.createElement(lazyRoutes.Ai) },
      { path: 'interview', element: React.createElement(lazyRoutes.Interview) },
      { path: 'createStory', element: React.createElement(lazyRoutes.CreateStory) },
      { path: 'createdStory/:id', element: React.createElement(lazyRoutes.CreatedStory) },
      { path: 'readStory/:id', element: React.createElement(lazyRoutes.ReadStory) },
      { path: 'editStory/:id', element: React.createElement(lazyRoutes.EditStory) },
      { path: 'view', element: React.createElement(lazyRoutes.View) },
      { path: 'mypage', element: React.createElement(lazyRoutes.Mypage) },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
