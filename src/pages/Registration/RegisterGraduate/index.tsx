import ilmslogo from '@/assets/ilmslogo.png';
import SignupForm from './SignupForm';

const RegisterGraduate = () => {
  return (
    <div className='flex flex-col items-center justify-center px-4'>
      <img
        src={ilmslogo}
        alt='ILMS logo'
        className='w-[200px] h-[120px] mt-8'
      />
      <h1 className='font-semibold text-xl text-secondary my-3'>
        Graduate Registration
      </h1>

      <div className='w-full max-w-[600px] mt-2'>
        <SignupForm />
      </div>
    </div>
  );
};

export default RegisterGraduate;
