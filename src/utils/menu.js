const handleCount = (menuItem, browserWindow) => {
  let iniCount = menuItem.label;
  browserWindow.webContents.send("change-initial-count", iniCount);
};
//TODO：强制focus窗口，以及已选的加勾

const handleBook = (menuItem, browserWindow) => {
  let iniBook = menuItem.id;
  browserWindow.webContents.send("change-initial-book", iniBook);
};

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
      { label: "四级核心词汇", id: "CET4_1", click: handleBook, type: "radio" },
      { label: "四级完整词汇", id: "CET4_3", click: handleBook, type: "radio" },
      { label: "六级核心词汇", id: "CET6_1", click: handleBook, type: "radio" },
      { label: "六级完整词汇", id: "CET6_3", click: handleBook, type: "radio" },
      { label: "GMAT词汇", id: "GMAT_3", click: handleBook, type: "radio" },
      { label: "GRE词汇", id: "GRE_2", click: handleBook, type: "radio" },
      { label: "IELTS词汇", id: "IELTS_3", click: handleBook, type: "radio" },
      { label: "TOEFL词汇", id: "TOEFL_2", click: handleBook, type: "radio" },
      { label: "SAT词汇", id: "SAT_2", click: handleBook, type: "radio" },
      {
        label: "考研必备词汇",
        id: "KaoYan_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: "考研完整词汇",
        id: "KaoYan_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: "专四真题高频词",
        id: "Level4_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: "专四核心词汇",
        id: "Level4luan_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: "专八真题高频词",
        id: "Level8_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: "专八核心词汇",
        id: "Level8luan_2",
        click: handleBook,
        type: "radio",
      },
    ],
  },
  {
    label: "日语词汇",
    submenu: [
      { label: "五十音", id: "Goin", click: handleBook, type: "radio" },
      {
        label: "标日中级词汇",
        id: "StdJp_Mid",
        click: handleBook,
        type: "radio",
      },
    ],
  },
  { label: "导入单词" },
  { type: "separator" },
  { label: "开机启动", type: "checkbox", checked: true },
  {
    label: "使用说明",
    click: async () => {
      const { shell } = require("electron");
      await shell.openExternal(
        "https://github.com/Charliecheung2/toastfish-mac/blob/master/README.md"
      );
    },
  },
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
      { type: "separator" },
      { label: "退出", role: "quit", accelerator: "esc" }, //本地快捷键
    ],
  },
];
module.exports = { trayTemplate, menuTemplate };
