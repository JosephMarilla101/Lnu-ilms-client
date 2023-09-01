import headerlogo from '@/assets/headerlogo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        'flex items-center shadow-md bg-primary text-white p-3 h-20 sticky top-0 z-20',
        className
      )}
    >
      <div className='h-full ml-1 hidden md:block'>
        <img src={headerlogo} alt='ILMS Logo' className='h-full' />
      </div>

      <div className='ml-auto'>
        <Button
          onClick={() => {
            navigate('/');
          }}
          variant={'link'}
          className='text-white'
        >
          Home
        </Button>
        <Button
          onClick={() => {
            navigate('/signup');
          }}
          variant={'link'}
          className='text-white'
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
