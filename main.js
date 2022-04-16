const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

let tray = null;

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, "fish.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
  createWindow();
});
