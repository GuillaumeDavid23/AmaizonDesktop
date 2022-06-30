const { app, BrowserWindow, ipcMain } = require("electron");
const dotenv = require("dotenv");
const path = require("path");
const contextMenu = require("electron-context-menu");
dotenv.config();

contextMenu({
    labels: {
        copy: "Copier",
        paste: "Coller",
        cut: "Couper",
        lookUpSelection: "Rechercher sur Google",
        saveImageAs: "Sauvegarder l'image sous...",
        inspect: "Inspecter l'élément",
        copyImage: "Copier l'image",
        searchWithGoogle: "Rechercher sur Google",
    },
    showSaveImageAs: true,
    paste: true,
});

function createWindow() {
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
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
