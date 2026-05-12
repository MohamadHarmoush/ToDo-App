import { NavLink } from 'react-router';

const NavBar = () => {
  return (
    <nav className='space-x-4'>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to='/tasks'
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`
        }
      >
        Tasks
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`
        }
      >
        About
      </NavLink>
    </nav>
  );
};

export default NavBar;
