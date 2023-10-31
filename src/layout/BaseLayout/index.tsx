import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Suspense } from 'react';
import useSidebar from '@/context/useSidebar';

const BaseLayout = () => {
  const { collapsed } = useSidebar();
  return (
    <>
      <Navbar className='h-20' />
      <div className='relative flex'>
        <div className='md:fixed h-full'>
          <Sidebar />
        </div>

        <div
          className={`flex-1 ${
            collapsed ? 'md:ml-[80px]' : 'md:ml-[250px]'
          } transition-all duration-300 ease-in-out`}
        >
          <Suspense fallback={<>Please wait....</>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
