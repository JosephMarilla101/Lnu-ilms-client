import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const UnAuthLayout = () => {
  return (
    <>
      <Navbar className='h-20' />

      <div className='h-[calc(100vh-5rem)]'>
        <Outlet />
      </div>
    </>
  );
};

export default UnAuthLayout;
