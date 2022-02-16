import { useState } from 'react';

import { nanoid } from 'nanoid';
import Input from '../../common/Input';
import s from './ContactForm.module.css';

const ContactForm = ({ onSubmitForm }) => {
  const [dataForm, setdataForm] = useState({
    name: '',
    number: '',
  });

  const resetForm = () =>
    setdataForm({
      name: '',
      number: '',
    });

  const addDataForm = e => {
    return setdataForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubFormData = e => {
    e.preventDefault();

    const objData = { id: nanoid(), ...dataForm };

    onSubmitForm(objData);

    resetForm();
  };

  const { name, number } = dataForm;
  return (
    <form onSubmit={onSubFormData} className={s.form}>
      <Input
        label="Name"
        type="text"
        name="name"
        onChange={addDataForm}
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <Input
        label="Number"
        type="tel"
        name="number"
        onChange={addDataForm}
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={s.btnAdd}>
        {' '}
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
