const { trayTemplate, menuTemplate } = require("./src/utils/menu");
const { app, BrowserWindow, Menu, Tray, globalShortcut } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const Select = require("./src/utils/select");
const selectDb = new Select(20);
selectDb.getBookNameAndNumber();

function createWindow(left) {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 150,
    frame: false,
    // vibrancy: "medium-light",
    visualEffectState: "active",
    resizable: false,
    alwaysOnTop: true,
    // show: false,
    backgroundColor: "#d7e1ec",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
    },
  });

  ipcMain.on("quit", (event) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.close();
  });

  mainWindow.setPosition(left, 0);
  mainWindow.loadURL("http://localhost:3000/");
  mainWindow.webContents.openDevTools(); //TODO:默认打开调试窗口，应该在env文件增加变量判断，正式版则不需要打开

  //全局快捷键
  const ret = globalShortcut.register("Cmd+M", () => {
    mainWindow.close();
  });
  if (!ret) {
    console.log("registration failed");
  }
}

app.setLoginItemSettings({
  openAtLogin: true, // 开机启动
  openAsHidden: true,
});
app.dock.isVisible = false;

app.whenReady().then((app) => {
  let tray = new Tray(path.join(__dirname, "./src/trayTemplate.png"));
  const contextMenu = Menu.buildFromTemplate(trayTemplate);
  const book = selectDb.TABLE_NAME;
  let current = contextMenu.getMenuItemById(book);
  current.checked = true;

  tray.setToolTip("摸摸鱼 背背词");
  tray.setContextMenu(contextMenu);
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  createWindow(width - 300);
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});

module.exports = createWindow;
