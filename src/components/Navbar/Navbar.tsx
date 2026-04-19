import { BsMoonStars } from 'react-icons/bs';
import { MdOutlineLightMode } from 'react-icons/md';

import css from './Navbar.module.css';

interface NavbarProps {
  onChange: () => void;
  mode: boolean;
}

const Navbar = ({ onChange, mode }: NavbarProps) => {
  return (
    <nav className={css.nav}>
      <a className={css.title} href="/">
        Where in the world?
      </a>

      <button className={css.button} onClick={onChange}>
        {mode ? <MdOutlineLightMode size={15} /> : <BsMoonStars />}
        <span>{mode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </nav>
  );
};

export default Navbar;
