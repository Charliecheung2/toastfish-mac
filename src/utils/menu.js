const { app } = require("electron");
const Select = require("./select");
const selectDb = new Select(20);
const progress = selectDb.selectCount();

const handleCount = (menuItem, browserWindow) => {
  let iniCount = menuItem.label;
  browserWindow.webContents.send("change-initial-count", iniCount);
};

const handleBook = (menuItem, browserWindow) => {
  let iniBook = menuItem.id;
  browserWindow.webContents.send("change-initial-book", iniBook);
};

const trayTemplate = [
  {
    label: "开始背词",
    id: "start",
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
      {
        label: `四级核心词汇(${progress[14].current}/${progress[14].number})`,
        id: "CET4_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: `四级完整词汇(${progress[13].current}/${progress[13].number})`,
        id: "CET4_3",
        click: handleBook,
        type: "radio",
      },
      {
        label: `六级核心词汇(${progress[12].current}/${progress[12].number})`,
        id: "CET6_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: `六级完整词汇(${progress[11].current}/${progress[11].number})`,
        id: "CET6_3",
        click: handleBook,
        type: "radio",
      },
      {
        label: `GMAT词汇(${progress[10].current}/${progress[10].number})`,
        id: "GMAT_3",
        click: handleBook,
        type: "radio",
      },
      {
        label: `GRE词汇(${progress[9].current}/${progress[9].number})`,
        id: "GRE_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: `IELTS词汇(${progress[8].current}/${progress[8].number})`,
        id: "IELTS_3",
        click: handleBook,
        type: "radio",
      },
      {
        label: `TOEFL词汇(${progress[7].current}/${progress[7].number})`,
        id: "TOEFL_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: `SAT词汇(${progress[6].current}/${progress[6].number})`,
        id: "SAT_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: `考研必备词汇(${progress[5].current}/${progress[5].number})`,
        id: "KaoYan_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: `考研完整词汇(${progress[4].current}/${progress[4].number})`,
        id: "KaoYan_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: `专四真题高频词(${progress[3].current}/${progress[3].number})`,
        id: "Level4_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: `专四核心词汇(${progress[2].current}/${progress[2].number})`,
        id: "Level4luan_2",
        click: handleBook,
        type: "radio",
      },
      {
        label: `专八真题高频词(${progress[1].current}/${progress[1].number})`,
        id: "Level8_1",
        click: handleBook,
        type: "radio",
      },
      {
        label: `专八核心词汇(${progress[0].current}/${progress[0].number})`,
        id: "Level8luan_2",
        click: handleBook,
        type: "radio",
      },
    ],
  },
  {
    label: "日语词汇",
    submenu: [
      {
        label: `五十音(${progress[15].current}/${progress[15].number})`,
        id: "Goin",
        click: handleBook,
        type: "radio",
      },
      {
        label: `标日中级词汇(${progress[16].current}/${progress[16].number})`,
        id: "StdJp_Mid",
        click: handleBook,
        type: "radio",
      },
    ],
  },
  { label: "导入单词" },
  { type: "separator" },
  {
    label: "开机启动",
    type: "checkbox",
    checked: true,
    click: (menuItem) => {
      app.setLoginItemSettings({
        openAtLogin: !menuItem.checked,
      });
    },
  },
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
      { label: "退出", role: "quit", accelerator: "command+M" }, //本地快捷键
    ],
  },
];
module.exports = { trayTemplate, menuTemplate };
