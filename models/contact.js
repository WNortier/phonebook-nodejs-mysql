//@ts-nocheck
const shortid = require('shortid');

var contactList = [];

module.exports = class Contact {
  constructor(name, email, number, address) {
    this.id = shortid.generate();
    this.name = name;
    this.email = email;
    this.number = number;
    this.address = address;
  }

  save() {
    contactList.push(this);
    return contactList;
  }

  static deleteContacts() {
    contactList.length = 0;
  }

  static deleteContact(index) {
    let contacts = [...contactList];
    contacts.splice(index, 1);
    contactList = contacts;
  }

  static updateContact(id, data) {
    const contacts = [...contactList];

    const index = contacts.findIndex((c) => {
      return c.id == id;
    });

    const contact = contacts[index];
    contact.name = data.name;
    contact.email = data.email;
    contact.number = data.number;
    contact.address = data.address;

    contacts[index] = contact
    contactList = contacts
  }

  static getContacts() {
    return contactList;
  }
};
