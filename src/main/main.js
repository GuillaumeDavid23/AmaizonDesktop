const dotenv = require("dotenv");
dotenv.config();
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadURL("http://localhost:3000/");

    win.on("closed", () => {
        win = null;
    });

    return win;
}

app.whenReady().then(createWindow);

ipcMain.on("evt_name_in", (evt) => {
    evt.sender.send("evt_name_back", "data");
});
