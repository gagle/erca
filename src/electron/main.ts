import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  let win: BrowserWindow | null = new BrowserWindow({
    center: true,
    width: 1024,
    height: 800,
    title: 'Proceso ERCA'
  });

  if (process.argv.includes('--dev')) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

    win.webContents.openDevTools();
  } else {
    win.loadURL(`file://${__dirname}/../ng/index.html`);
  }

  win.on('closed', () => {
    win = null;
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
