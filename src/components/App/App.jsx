import { useState, useEffect } from 'react';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import * as storage from '../../services/localStorage.js';
import s from './App.module.css';

const CONTACTS_KEY_LS = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const dataLocalStorage = storage.get(CONTACTS_KEY_LS);

    if (dataLocalStorage) {
      setContacts(dataLocalStorage);
    }
  }, []);

  useEffect(() => {
    storage.save(CONTACTS_KEY_LS, contacts);
  }, [contacts]);

  const addDataApp = e => {
    setFilter(e.target.value);
  };

  const normalizeName = name =>
    name
      .split(' ')
      .map(word => {
        const firstUpCaseLetter = word.charAt(0).toUpperCase();
        const anoterLetter = word.substring(1);
        return `${firstUpCaseLetter}${anoterLetter}`;
      })
      .join(' ');

  const addContacts = obj => {
    const isHaveName = contacts.some(({ name }) => name === obj.name);

    if (isHaveName) {
      return alert(`${normalizeName(obj.name)} is alredy in contacts.`);
    }

    setContacts(prevState => [...prevState, obj]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
    setFilter('');
  };

  const filterContacts = filterName => {
    const normalizedData = filterName.toLowerCase();
    const arrayFilter = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedData),
    );
    return arrayFilter;
  };

  return (
    <div className={s.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addContacts} />

      <h2>Contacts</h2>
      {contacts.length > 1 && (
        <Filter
          onChangeDate={addDataApp}
          value={contacts.length < 1 ? '' : filter}
        />
      )}
      {!contacts.length && <p>Please, add contact!</p>}
      {!!contacts.length && (
        <ContactList
          normalizeName={normalizeName}
          onClickBtnDel={deleteContact}
          filterContacts={filterContacts}
          filterName={filter}
        />
      )}
    </div>
  );
};

export default App;

// deleteContact = () => {
//   const id = e.target.parentElement.id;
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(item => item.id !== id),
//   }));
// };
