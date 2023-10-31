import ilmslogo from '@/assets/ilmslogo.png';
import Image from '../Image';
import LibrarianForm from './LibrarianForm';

const AdminLogin = () => {
  return (
    <div className='h-full w-full grid grid-cols-12'>
      <div className='col-span-6 hidden md:flex items-center justify-end'>
        <Image />
      </div>

      <div className='col-span-12 md:col-span-6 flex flex-col items-center justify-center px-2'>
        <img src={ilmslogo} alt='ILMS logo' className='w-[200px]' />
        <h1 className='font-semibold text-xl text-secondary my-3'>
          Librarian Login
        </h1>

        <div className='w-full max-w-[300px]'>
          <LibrarianForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
