import React, { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if(parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  addContact = data => {
    const { contacts } = this.state;

    const dublicate = contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
    );

    if (dublicate) {
      return alert(`${data.name} is already in contacts`);
    }

    data.id = nanoid();

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilterValue = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <div className={css.container}>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} changeFilterValue={this.changeFilterValue} />
        <ContactList contacts={this.getContacts()} deleteContact={this.deleteContact} /> 
        </div>        
      </div>
    );
  }
}
