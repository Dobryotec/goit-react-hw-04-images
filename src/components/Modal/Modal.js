import { useEffect } from 'react';
import css from './Modal.module.css';

export default function Modal({ hideModal, largeImageURL }) {
  useEffect(() => {
    const handleKeyDown = e => {
      console.log(e);
      if (e.code === 'Escape') {
        hideModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hideModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      hideModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}
