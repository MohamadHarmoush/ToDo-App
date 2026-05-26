import { NavLink } from 'react-router';

type NavItem = {
  label: string;
  link: string;
};

type Props = {
  navItems: NavItem[];
};

const NavBar = ({ navItems }: Props) => {
  return (
    <nav className='space-x-4'>
      {navItems.map((navItem: NavItem) => (
        <NavLink
          key={navItem.link}
          to={navItem.link}
          className={({ isActive }: { isActive: boolean }) =>
            `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`
          }
        >
          {navItem.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
