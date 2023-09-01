import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import {
  GaugeCircle,
  BookCopy,
  ScrollText,
  Users2,
  BookOpenCheck,
  Settings,
} from 'lucide-react';
import useSidebar from '@/context/useSidebar';

const SidebarLayout = () => {
  const { toggled, setToggled, collapsed } = useSidebar();

  return (
    <div>
      <Sidebar
        className='h-screen text-white'
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
          <MenuItem
            icon={<GaugeCircle />}
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
            icon={<BookOpenCheck />}
            component={<NavLink to='/issued-books' />}
          >
            Issued Books
          </MenuItem>
          <MenuItem icon={<Users2 />} component={<NavLink to='/students' />}>
            Students
          </MenuItem>
          <MenuItem icon={<Users2 />} component={<NavLink to='/librarians' />}>
            Librarians
          </MenuItem>
          <MenuItem icon={<Settings />} component={<NavLink to='/settings' />}>
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
