const fs = require("fs").promises;
const { LOADIPHLPAPI } = require("dns");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    console.table(contList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const contId = contList.filter((cont) => Number(cont.id) === contactId);

    if (contId.length !== 0) {
      console.table(contId);
    } else {
      console.log("ID not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const indexRemoveId = contList.findIndex(
      (cont) => Number(cont.id) === contactId
    );
    if (indexRemoveId !== -1) {
      contList.splice(indexRemoveId, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contList), "utf8");
    } else {
      console.log("ID not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const maxId = Math.max(...contList.map((cont) => Number(cont.id)));
    const newContact = {
      id: String(maxId + 1),
      name,
      email,
      phone,
    };
    contList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contList), "utf8");
    console.table(newContact);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
