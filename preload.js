const Select = require("./src/utils/select");
const { ipcRenderer } = require("electron");
window.database = {
  Select,
  quit: () => {
    ipcRenderer.send("quit");
  },
};

// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("myAPI", {
//   Select,
//   quit: () => {
//     ipcRenderer.send("quit");
//   },
// });
