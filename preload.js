const Select = require("./src/utils/select");
const { ipcRenderer } = require("electron");
// const { contextBridge, ipcRenderer } = require("electron");

const selectDb = new Select(20);

let iniCount;
ipcRenderer.on("change-initial-count", (event, message) => {
  iniCount = message;
  selectDb.updateNumber(iniCount);
});

ipcRenderer.on("change-initial-book", (event, message) => {
  selectDb.updateBookName(message);
  window.location.hash = "/";
});

window.database = {
  selectDb,
  quit: () => {
    ipcRenderer.send("quit");
  },
};

// contextBridge.exposeInMainWorld("myAPI", {
//   selectDb,
//   quit: () => {
//     ipcRenderer.send("quit");
//   },
// });
