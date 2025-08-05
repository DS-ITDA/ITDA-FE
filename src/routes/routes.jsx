import React from 'react';

export const lazyRoutes = {
  Ai: React.lazy(() => import('../pages/ai/Ai')),
  CreateStory: React.lazy(() => import('../pages/createStory/CreateStory')),
  EditStory: React.lazy(() => import('../pages/editStory/EditStory')),
  Home: React.lazy(() => import('../pages/home/Home')),
  Interview: React.lazy(() => import('../pages/interview/Interview')),
  Login: React.lazy(() => import('../pages/login/Login')),
  Mypage: React.lazy(() => import('../pages/mypage/Mypage')),
  ReadStory: React.lazy(() => import('../pages/readStory/ReadStory')),
  View: React.lazy(() => import('../pages/view/View')),
  CreatedStory: React.lazy(() => import('../pages/CreatedStory/CreatedStory')),
  LoginSuccess: React.lazy(() => import('../pages/login/LoginSuccess')),
};
