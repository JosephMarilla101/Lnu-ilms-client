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
  BookOpenCheckIcon,
  Loader,
  PackageCheck,
  BadgeCheck,
  BadgeX,
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
                icon={<BookUp />}
                label='Book Requests'
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
                <MenuItem
                  icon={<Loader className='text-yellow-700' />}
                  component={<NavLink to='/book-request/pending' />}
                >
                  Pending
                </MenuItem>
                <MenuItem
                  icon={<PackageCheck className='text-blue-600' />}
                  component={<NavLink to='/book-request/for-pickup' />}
                >
                  For Pickup
                </MenuItem>
                <MenuItem
                  icon={<BadgeCheck className='text-green-600' />}
                  component={<NavLink to='/book-request/released' />}
                >
                  Released
                </MenuItem>
                <MenuItem
                  icon={<BadgeX className='text-orange-600' />}
                  component={<NavLink to='/book-request/cancelled' />}
                >
                  Cancelled
                </MenuItem>
                <MenuItem
                  icon={<BadgeX className='text-red-700' />}
                  component={<NavLink to='/book-request/disapproved' />}
                >
                  Disapproved
                </MenuItem>
              </SubMenu>
            </Menu>

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
                icon={<BookOpenCheck />}
                label='Issued Books'
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
                <MenuItem
                  icon={<BadgeX className='text-red-600' />}
                  component={<NavLink to='/issued-books/unreturn' />}
                >
                  Unreturn
                </MenuItem>
                <MenuItem
                  icon={<BadgeCheck className='text-green-600' />}
                  component={<NavLink to='/issued-books/returned' />}
                >
                  Returned
                </MenuItem>
              </SubMenu>
            </Menu>

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

            <MenuItem
              icon={<BookOpenCheckIcon />}
              component={<NavLink to='/borrowed-history' />}
            >
              Borrowed Books
            </MenuItem>
          </>
        )}
      </Menu>
    </Sidebar>
  );
};

export default SidebarLayout;
