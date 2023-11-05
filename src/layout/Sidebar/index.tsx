import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import {
  BookCopy,
  ScrollText,
  Users2,
  BookOpenCheck,
  BookUp,
  LayoutDashboard,
  BarChart3,
} from 'lucide-react';
import useSidebar from '@/context/useSidebar';
import { useAuthenticateUser } from '@/hooks/useAuth';

const SidebarLayout = () => {
  const { toggled, setToggled, collapsed } = useSidebar();
  const auth = useAuthenticateUser();

  return (
    <Sidebar
      className='h-full max-h-[calc(100vh - 5rem)] pt-[5rem] text-white'
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

            <MenuItem
              icon={<BarChart3 />}
              component={<NavLink to='/statistics' />}
            >
              Statistics
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
              <SubMenu
                icon={<Users2 />}
                label='Users'
                rootStyles={{
                  ['& > .' + menuClasses.button]: {
                    backgroundColor: '#070372',
                    color: 'primary',
                    '&:hover': {
                      backgroundColor: '#eecef9',
                    },
                  },
                  ['.' + menuClasses.subMenuContent]: {
                    backgroundColor: '#070372',
                  },
                }}
              >
                <MenuItem component={<NavLink to='/students' />}>
                  Students
                </MenuItem>

                <MenuItem component={<NavLink to='/graduates' />}>
                  Graduates
                </MenuItem>
                <MenuItem component={<NavLink to='/teachers' />}>
                  Teachers
                </MenuItem>

                {auth.data?.role === 'ADMIN' && (
                  <MenuItem component={<NavLink to='/librarians' />}>
                    Librarians
                  </MenuItem>
                )}
              </SubMenu>
            </Menu>
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
