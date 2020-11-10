//@ts-nocheck
const express = require('express');
const router = express.Router();

const {
  deleteContacts,
  getContacts,
  deleteContact,
  updateContact,
} = require('../models/contact');
// const Contact = require('../models/contact');

router.get('/about', (req, res) => {
  res.status(200).render('about', {
    pageTitle: 'About',
    aboutCSS: true,
    contactCSS: false,
    addCSS: false,
  });
});

router.get('/', (req, res) => {
  res.status(200).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    aboutCSS: false,
    count: getContacts().length,
  });
});

router.post('/contact', (req, res) => {
  if (req.query.edit !== undefined) {
    const id = req.query.id;
    const contacts = getContacts();
    const index = contacts.findIndex((c) => {
      return c.id == id;
    });
    const contact = contacts[index];
    res.status(201).render('add', {
      pageTitle: 'Add Contact',
      addCSS: true,
      contactCSS: false,
      aboutCSS: false,
      count: getContacts().length,
      contact: contact,
      success: 'success',
    });
  } else {
    let contact = new Contact(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.number,
      req.body.address
    );
    contact.save();
    req.flash('info', 'Contact added to phonebook');
    res.status(201).render('add', {
      pageTitle: 'Add Contact',
      addCSS: true,
      contactCSS: false,
      aboutCSS: false,
      count: getContacts().length,
    });
  }
});

router.post('/edit-product/:id', (req, res) => {
  const { id } = req.params;
  updateContact(id, req.body);
  res.status(201).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    aboutCSS: false,
    count: getContacts().length,
  });
});

router.post('/delete-all', (req, res) => {
  deleteContacts();
  res.status(201).redirect('/');
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  let contacts = getContacts();
  const index = contacts.findIndex((c) => {
    return c.id == id;
  });
  if (index !== undefined) {
    deleteContact(index);
    res.status(201).render('contacts', {
      pageTitle: 'Contacts',
      contactCSS: true,
      addCSS: false,
      aboutCSS: false,
      contacts: getContacts(),
    });
  } else {
    res.status(404).json({ message: `Record ${id} was not found` });
  }
});

router.get('/contacts', (req, res) => {
  res.render('contacts', {
    pageTitle: 'Contacts',
    contactCSS: true,
    addCSS: false,
    aboutCSS: false,
    contacts: getContacts(),
  });
});

module.exports = router;
