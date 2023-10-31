import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import {
  BookCopy,
  ScrollText,
  Users2,
  BookOpenCheck,
  BookUp,
  LayoutDashboard,
} from 'lucide-react';
import useSidebar from '@/context/useSidebar';
import { useAuthenticateUser } from '@/hooks/useAuth';

const SidebarLayout = () => {
  const { toggled, setToggled, collapsed } = useSidebar();
  const auth = useAuthenticateUser();

  return (
    <Sidebar
      className='h-full max-h-[calc(100vh - 5rem)]max-h-screen text-white'
      breakPoint='md'
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      collapsed={collapsed}
      transitionDuration={500}
      backgroundColor='#070372'
    >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#1e5288',
              color: 'primary',
            },
            [`:hover`]: {
              backgroundColor: '#1e5288',
              color: '',
            },
          },
        }}
      >
        {auth.data?.role === 'ADMIN' || auth.data?.role === 'LIBRARIAN' ? (
          <>
            <MenuItem
              icon={<LayoutDashboard />}
              component={<NavLink to='/dashboard' />}
            >
              Dashboard
            </MenuItem>
            <MenuItem icon={<BookCopy />} component={<NavLink to='/books' />}>
              Books
            </MenuItem>
            <MenuItem
              icon={<ScrollText />}
              component={<NavLink to='/categories' />}
            >
              Categories
            </MenuItem>
            <MenuItem icon={<Users2 />} component={<NavLink to='/authors' />}>
              Authors
            </MenuItem>
            <MenuItem
              icon={<BookUp />}
              component={<NavLink to='/book/requests' />}
            >
              Book Requests
            </MenuItem>
            <MenuItem
              icon={<BookOpenCheck />}
              component={<NavLink to='/book/issued' />}
            >
              Issued Books
            </MenuItem>

            <MenuItem icon={<Users2 />} component={<NavLink to='/students' />}>
              Students
            </MenuItem>

            <MenuItem icon={<Users2 />} component={<NavLink to='/graduates' />}>
              Graduates
            </MenuItem>

            <MenuItem icon={<Users2 />} component={<NavLink to='/teachers' />}>
              Teachers
            </MenuItem>
            {auth.data?.role === 'ADMIN' && (
              <MenuItem
                icon={<Users2 />}
                component={<NavLink to='/librarians' />}
              >
                Librarians
              </MenuItem>
            )}
          </>
        ) : (
          <>
            <MenuItem
              icon={<LayoutDashboard />}
              component={<NavLink to='/dashboard' />}
            >
              Dashboard
            </MenuItem>
            <MenuItem icon={<BookCopy />} component={<NavLink to='/books' />}>
              Books
            </MenuItem>
          </>
        )}
      </Menu>
    </Sidebar>
  );
};

export default SidebarLayout;
