import HomeLayout from '@layouts/HomeLayout';
import { createBrowserRouter } from 'react-router-dom';
import { lazyRoutes } from './routes';
import React from 'react';
import ProtectedLayout from '../layouts/ProtectedLayout';

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [{ path: 'login', element: React.createElement(lazyRoutes.Login) }],
  },
];

const protectedRoutes = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: React.createElement(lazyRoutes.Home) },
      { path: 'ai', element: React.createElement(lazyRoutes.Ai) },
      { path: 'interview', element: React.createElement(lazyRoutes.Interview) },
      { path: 'createStory', element: React.createElement(lazyRoutes.CreateStory) },
      { path: 'createdStory', element: React.createElement(lazyRoutes.CreatedStory) },
      { path: 'readStory/:id', element: React.createElement(lazyRoutes.ReadStory) },
      { path: 'editStory/:id', element: React.createElement(lazyRoutes.EditStory) },
      { path: 'view', element: React.createElement(lazyRoutes.View) },
      { path: 'mypage', element: React.createElement(lazyRoutes.Mypage) },
      { path: 'oauth/success', element: React.createElement(lazyRoutes.LoginSuccess) },
    ],
  },
];
const router = createBrowserRouter([...routes, ...protectedRoutes]);

export default router;
