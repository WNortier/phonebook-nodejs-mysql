//@ts-nocheck
const shortid = require('shortid');

var contactList = [];

module.exports = class Contact {
  constructor(firstname, lastname, email, number, address) {
    this.id = shortid.generate();
    this.first_name = firstname;
    this.last_name = lastname;
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

    const index = contacts.findIndex((contact) => {
      return contact.id == id;
    });

    const contact = contacts[index];
    contact.first_name = data.first_name;
    contact.last_name = data.last_name;
    contact.email = data.email;
    contact.number = data.number;
    contact.address = data.address;

    contacts[index] = contact;
    contactList = contacts;
  }

  static getContacts() {
    return contactList;
  }
};
