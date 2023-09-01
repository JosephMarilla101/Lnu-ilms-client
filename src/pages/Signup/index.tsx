import ilmslogo from '@/assets/ilmslogo.png';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center px-4'>
      <img src={ilmslogo} alt='ILMS logo' className='w-[200px] mt-8' />
      <h1 className='font-semibold text-xl text-slate-700 my-3'>
        Student Registration
      </h1>

      <div className='w-full max-w-[600px] mt-2'>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
