import { BsMoonStars } from 'react-icons/bs';
import { MdOutlineLightMode } from 'react-icons/md';

import css from './Navbar.module.css';

interface NavbarProps {
  onChange: () => void;
  mode: string;
}

const Navbar = ({ onChange, mode }: NavbarProps) => {
  const isDark = mode === 'dark';

  return (
    <nav className={css.nav}>
      <a className={css.title} href="/">
        Where in the world?
      </a>

      <button className={css.button} onClick={onChange}>
        {isDark ? <MdOutlineLightMode size={15} /> : <BsMoonStars />}
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </nav>
  );
};

export default Navbar;
