import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const BaseLayout = () => {
  return (
    <>
      <Navbar className='h-20' />

      <div className='flex bg-[#F2F3F6]'>
        <Sidebar />
        <div className='h-[calc(100vh-5rem)] flex-grow overflow-y-auto p-2'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
