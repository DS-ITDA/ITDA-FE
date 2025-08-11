import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '@components/common/Navbar/Navbar';
import { Suspense } from 'react';

const ProtectedLayout = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default ProtectedLayout;
