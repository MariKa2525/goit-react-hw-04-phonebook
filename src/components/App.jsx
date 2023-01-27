import { useState, useEffect } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = contact => {
    const double = contacts.find(
      item => item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );

    if (double) {
      return alert(`${contact.name} is already in contacts`);
    }
    contact.id = nanoid();

    setContacts(prev => {
      return [...prev, contact];
    });
  };

  const getContacts = () => {
    const filterContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterContact)
    );
  };

  const deleteContact = id => {
    setContacts(prev => {
      return prev.filter(contact => contact.id !== id);
    });
  };

  const changeFilterValue = evt => {
    setFilter(evt.currentTarget.value);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm createContact={createContact} />
      <div className={css.container}>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} changeFilterValue={changeFilterValue} />
        <ContactList contacts={getContacts()} deleteContact={deleteContact} />
      </div>
    </div>
  );
};
