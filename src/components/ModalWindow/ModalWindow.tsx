import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { Country } from '../../types/country';

import css from './ModalWindow.module.css';

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

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.button} onClick={onClose}>
          &times;
        </button>

        <h2>{country.name.common}</h2>
      </div>
    </div>,
    document.body,
  );
};

export default ModalWindow;
