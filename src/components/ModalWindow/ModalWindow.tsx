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
    names: { common, official },
    capitals,
    population,
    region,
    subregion,
    flag: { url_png, description },
    currencies,
    languages,
    tlds,
  } = country;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <IoClose className={css.closeIcon} />
        </button>

        <div className={css.content}>
          <div className={css.left}>
            <img className={css.image} src={url_png} alt={description} />

            <h2 className={css.title}>{common}</h2>
            <p className={css.official}>{official}</p>
          </div>

          <div className={css.right}>
            {population && population > 0 && (
              <p>
                <strong>Population: </strong> {population.toLocaleString()}
              </p>
            )}
            {region && region.length > 0 && (
              <p>
                <strong>Region: </strong> {region}
              </p>
            )}
            {subregion && subregion.length > 0 && (
              <p>
                <strong>Subregion: {subregion}</strong>
              </p>
            )}
            {capitals[0] && capitals[0]?.name.length > 0 && (
              <p>
                <strong>Capital: </strong> {capitals[0]?.name}
              </p>
            )}
            {tlds && tlds.length > 0 && (
              <p>
                <strong>Top Level Domain: </strong> {tlds?.[0]}
              </p>
            )}
            {currencies.length > 0 && (
              <p>
                <strong>Currency: </strong>
                {currencies
                  .map(currency => `${currency.name} (${currency.symbol})`)
                  .join(', ')}
              </p>
            )}
            {languages.length > 0 && (
              <p>
                <strong>Languages: </strong>
                {languages.map(language => language.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalWindow;
