import PropTypes from 'prop-types';
import css from './Contact.module.css';

export const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <button
        className={css.btn}
        type="button"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
