import { BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';

let historyStack: string[] = [];

export function initHistoryStack(mainWindow: BrowserWindow): void {
  ipcMain.on(
    'history-update',
    (event: IpcMessageEvent, newHistoryStack: string[]) => {
      historyStack = [...newHistoryStack];
    }
  );

  ipcMain.on('history-load', () => {
    mainWindow.webContents.send('history-loaded', historyStack);
  });
}
