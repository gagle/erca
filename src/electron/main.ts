import { app, BrowserWindow } from 'electron';
import { initHistoryStack } from './url-bar-history';

const isDevelopment = process.env.NODE_ENV === 'development';

app.on('ready', () => {
  let mainWindow: BrowserWindow | null = new BrowserWindow({
    center: true,
    width: 1024,
    height: 728,
    title: 'Proceso ERCA',
    backgroundColor: '#f1f6fa',
    webPreferences: {
      devTools: isDevelopment
    }
  });

  if (isDevelopment) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../node_modules/electron`)
    });
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${__dirname}/../ng/index.html`);
  }

  mainWindow.maximize();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  initHistoryStack(mainWindow);
});

app.on('window-all-closed', () => {
  app.quit();
});
