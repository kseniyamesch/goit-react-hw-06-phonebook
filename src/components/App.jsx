import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

import {
  addContact,
  deleteContact,
  changeFilter,
} from '../redux/contactsSlice';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      return alert(`${data.name} is already in Contact List`);
    }
    dispatch(addContact(contact));
  };

  const deleteItem = id => {
    dispatch(deleteContact(id));
  };

  const onFilter = evt => {
    const { value } = evt.currentTarget;
    dispatch(changeFilter(value));
  };

  const renderContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler}></ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={onFilter}></Filter>
      <ContactList contacts={renderContact()} handleDelete={deleteItem} />
    </div>
  );
}
