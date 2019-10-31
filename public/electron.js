const { join } = require("path");
const { app, Menu, Tray, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindowRef;
let mainTrayRef;

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 680,
    width: 800,
    resizable: false,
    title: "Botero",
    backgroundColor: "#333"
  });
  mainWindowRef = mainWindow;

  const tray = new Tray(join(__dirname, "assets/icon.ico"));
  mainTrayRef = tray;

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: "Quit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  tray.on("click", (event) => {
    tray.displayBalloon({
      title: "Esto es una prueba",
      content: "Contenido de prueba",
      icon: join(__dirname, "assets/icon.ico")
    });
  });

  tray.on("double-click", (event) => {
    event.preventDefault();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  })

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });
}

app.on("ready", createWindow);