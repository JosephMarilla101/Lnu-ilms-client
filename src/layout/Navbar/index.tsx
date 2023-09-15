import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticateUser } from '@/hooks/useAuth';
import useSidebar from '@/context/useSidebar';
import headerlogo from '@/assets/headerlogo.png';

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const auth = useAuthenticateUser();
  const navigate = useNavigate();
  const { setToggled } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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

      <button
        className='md:hidden ml-1 p-2'
        onClick={() => setToggled((prev) => !prev)}
      >
        <Menu size={30} />
      </button>

      <div className='ml-auto mr-2'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className='bg-slate-300 p-[2px] rounded-full cursor-pointer'>
              <Avatar className='text-sm h-[47px] w-[47px] text-black'>
                <AvatarImage src='' />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={2}
            className='w-[220px] absolute -right-5'
          >
            <DropdownMenuLabel>
              {auth.data?.role !== 'STUDENT' ? (
                <p className='truncate'>{`${'(' + auth.data?.username + ')'} ${
                  auth.data?.email
                }`}</p>
              ) : (
                <p className='truncate'>{auth.data.email}</p>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className='mr-2 h-4 w-4' />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
