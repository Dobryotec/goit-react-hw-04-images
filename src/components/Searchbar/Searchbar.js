import { useState } from 'react';
import css from './Searchbar.module.css';

export default function Searchbar({ createSearchText }) {
  const [value, setValue] = useState('');
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() !== '') {
      createSearchText(value);
      setValue('');
    }
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css['button-label']}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
}
