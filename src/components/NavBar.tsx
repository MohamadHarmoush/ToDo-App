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
            `text-sm font-medium transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'
            }`
          }
        >
          {navItem.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
