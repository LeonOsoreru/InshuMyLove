const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    resizable: true,
    autoHideMenuBar: true,
    show: false,
    icon: path.join(__dirname, 'icon.ico')
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadFile('index.html');

  mainWindow.setOpacity(0);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 0.05;
      mainWindow.setOpacity(opacity);
      if (opacity >= 1) clearInterval(fadeIn);
    }, 20);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});