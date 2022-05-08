const Select = require("./src/utils/select");
const { ipcRenderer } = require("electron");
// const { contextBridge, ipcRenderer } = require("electron");

const selectDb = new Select("CET4_1", 20);

let iniCount;
ipcRenderer.on("change-initial-count", (event, message) => {
  iniCount = message;
  console.log("preload", iniCount);
  selectDb.updateNumber(iniCount);
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
