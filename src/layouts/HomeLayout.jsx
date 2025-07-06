import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/Navbar/Navbar';
import { Suspense } from 'react';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default HomeLayout;
