import PropTypes from 'prop-types';
import s from './ItemContact.module.css';

const ItemContact = ({ name, number, onClickBtnDel, id, normalizeName }) => {
  return (
    <li className={s.item} id={id}>
      {normalizeName(name)}: {number}
      <button
        className={s.btnDel}
        onClick={() => onClickBtnDel(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ItemContact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ItemContact;

//<button onClick={onClickBtn} type="button">
