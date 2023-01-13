const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    contList.map((cont) => {
      console.log(
        `ID: ${cont.id} ${cont.name}   ${cont.email}   ${cont.phone}`
      );
    });
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
      console.log(
        `ID: ${contId[0].id} ${contId[0].name} ${contId[0].email} ${contId[0].phone}`
      );
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
    let arrayId = [];
    contList.map((cont) => {
      arrayId.push(Number(cont.id));
    });
    const indexRemoveId = arrayId.indexOf(contactId);
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
    let arrayId = [];
    contList.map((cont) => {
      arrayId.push(Number(cont.id));
    });
    const maxId = Math.max(...arrayId);
    const newContact = {
      id: String(maxId + 1),
      name,
      email,
      phone,
    };
    contList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contList), "utf8");
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
