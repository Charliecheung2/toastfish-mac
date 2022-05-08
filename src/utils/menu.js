const handleCount = (menuItem, browserWindow) => {
  let iniCount = menuItem.label;
  browserWindow.webContents.send("change-initial-count", iniCount);
};
//TODO：强制focus窗口，以及已选的加勾

const trayTemplate = [
  {
    label: "开始背词",
    click: () => {
      const { screen } = require("electron");
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width } = primaryDisplay.workAreaSize;
      const createWindow = require("../../main");
      createWindow(width - 300);
    },
  },
  {
    label: "默认背词个数",
    submenu: [
      {
        label: "5",
        type: "radio",
        click: handleCount,
      },
      { label: "10", type: "radio", click: handleCount },
      { label: "15", type: "radio", click: handleCount },
      { label: "20", type: "radio", click: handleCount },
    ],
  },
  {
    label: "英语词汇",
    submenu: [
      { label: "四级核心词汇" },
      { label: "四级完整词汇" },
      { label: "六级核心词汇" },
      { label: "六级完整词汇" },
      { type: "separator" },
      { label: "GMAT词汇" },
      { label: "GRE词汇" },
      { label: "IELTS词汇" },
      { label: "TOEFL词汇" },
      { label: "SAT词汇" },
      { type: "separator" },
      { label: "考研必备词汇" },
      { label: "考研完整词汇" },
      { type: "separator" },
      { label: "专四真题高频词" },
      { label: "专四核心词汇" },
      { label: "专八真题高频词" },
      { label: "专八核心词汇" },
    ],
  },
  {
    label: "日语词汇",
    submenu: [{ label: "五十音" }, { label: "标日中级词汇" }],
  },
  { label: "导入单词" },
  { type: "separator" },
  { label: "开机启动", type: "checkbox", checked: true },
  { label: "使用说明" },
  { label: "退出", role: "quit" },
  { type: "separator" },
  {
    label: "为我们点亮🌟",
    click: async () => {
      const { shell } = require("electron");
      await shell.openExternal(
        "https://github.com/Charliecheung2/toastfish-mac"
      );
    },
  },
];

const menuTemplate = [
  {
    label: "Moyu",
    submenu: [
      { role: "about" },
      { role: "hide" },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  {
    role: "help",
    submenu: [
      { label: "使用说明" },
      {
        label: "为我们点亮🌟",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal(
            "https://github.com/Charliecheung2/toastfish-mac"
          );
        },
      },
    ],
  },
];
module.exports = { trayTemplate, menuTemplate };
