import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { Country } from '../../types/country';

import css from './ModalWindow.module.css';
import { IoClose } from 'react-icons/io5';

interface ModalWindowProps {
  country: Country | null;
  onClose: () => void;
}

const ModalWindow = ({ country, onClose }: ModalWindowProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    if (!country) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [country, onClose]);

  if (!country) return null;

  const {
    currencies,
    languages,
    tld,
    population,
    region,
    subregion,
    capital,
    name,
    flags: { png },
  } = country;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <IoClose className={css.closeIcon} />
        </button>

        <div className={css.content}>
          <div className={css.left}>
            <img className={css.image} src={png} alt={name.common} />

            <h2 className={css.title}>{name.common}</h2>
            <p className={css.official}>{name.official}</p>
          </div>

          <div className={css.right}>
            <p>
              <strong>Population:</strong> {population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {region}
            </p>
            <p>
              <strong>Subregion:</strong> {subregion ?? 'N/A'}
            </p>
            <p>
              <strong>Capital:</strong> {capital?.[0] ?? 'N/A'}
            </p>
            <p>
              <strong>Top Level Domain:</strong> {tld?.[0] ?? 'N/A'}
            </p>

            <p>
              <strong>Currency:</strong>
              {currencies ? currencies[Object.keys(currencies)[0]].name : 'N/A'}
            </p>

            <p>
              <strong>Languages:</strong>
              {languages ? Object.values(languages).join(', ') : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalWindow;
