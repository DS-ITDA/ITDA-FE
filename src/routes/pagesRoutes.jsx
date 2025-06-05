import HomeLayout from '@layouts/HomeLayout';
import { lazyRoutes } from '@routes/routes';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <lazyRoutes.Home /> },
      { path: 'login', element: <lazyRoutes.Login /> },
      { path: 'ai', element: <lazyRoutes.Ai /> },
      { path: 'interview', element: <lazyRoutes.Interview /> },
      { path: 'createStory', element: <lazyRoutes.CreateStory /> },
      { path: 'readStory/:id', element: <lazyRoutes.ReadStory /> },
      { path: 'editStory/:id', element: <lazyRoutes.EditStory /> },
      { path: 'view', element: <lazyRoutes.View /> },
      { path: 'mypage', element: <lazyRoutes.Mypage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
