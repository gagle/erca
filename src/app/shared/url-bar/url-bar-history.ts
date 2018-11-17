import { BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';

const historyStack: string[] = [];

export function initHistory(mainWindow: BrowserWindow): void {
  ipcMain.on('history-navigate', (event: IpcMessageEvent, url: string) => {
    console.log('history-navigate', url);
    historyStack.push(url);
  });

  ipcMain.on('history-load', () => {
    mainWindow.webContents.send('history-loaded', historyStack);
  });
}
