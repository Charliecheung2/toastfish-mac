const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 150,
    frame: false,
    vibrancy: "medium-light",
    visualEffectState: "active",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setPosition(1140, 0);
  mainWindow.loadURL("http://localhost:3000/");
}

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

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});