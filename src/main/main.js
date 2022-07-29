const { app, BrowserWindow, ipcMain, shell } = require('electron')
const dotenv = require('dotenv')
const path = require('path')
const contextMenu = require('electron-context-menu')
dotenv.config()

const BASE_URL = 'http://localhost:3000'

contextMenu({
	labels: {
		copy: 'Copier',
		paste: 'Coller',
		cut: 'Couper',
		lookUpSelection: 'Rechercher sur Google',
		saveImageAs: "Sauvegarder l'image sous...",
		inspect: "Inspecter l'élément",
		copyImage: "Copier l'image",
		searchWithGoogle: 'Rechercher sur Google'
	},
	showSaveImageAs: true,
	paste: true
})

let listWindows = []

function createWindow(url = '/') {
	let win = new BrowserWindow({
		width: 1200,
		height: 800,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js')
		}
	})

	win.loadURL(`http://localhost:3000${url}`)

	win.webContents.openDevTools({ mode: 'detach' })

	win.on('closed', () => {
		if (listWindows.indexOf(win) == 0) {
			app.quit()
		}

		win = null
	})

	listWindows.push(win)

	return win
}

const parseData = (data) => {
	return Array.isArray(data) ? data[0] : data
}

const mainGoToPage = (uri = '/') => {
	console.log(`main::mainGoToPage> Try accessing page: ${BASE_URL}${uri}`)
	listWindows[0].loadURL(`${BASE_URL}${uri}`)
}

app.whenReady().then(createWindow)

ipcMain.on('evt_name_in', (evt, data) => {
	evt.sender.send('evt_name_back', 'data')
})

ipcMain.on('mailto', (evt, data) => {
	let receiveData = Array.isArray(data) ? data[0] : data
	shell.openExternal(`mailto:${receiveData}?subject=Prise de contact&body=`)
})

ipcMain.on('showCustomerDetailWindow', (event, data) => {
	let customerId
	customerId = Array.isArray(data) ? data[0] : data

	createWindow(`/customers/${customerId}`)
})

ipcMain.on('mainShowAppointmentPage', (event, data) => {
	let customerId
	customerId = Array.isArray(data) ? data[0] : data

	listWindows[0].loadURL(`http://localhost:3000/home`)
})

ipcMain.on('mainGoToPage', (event, data) => {
	console.log('mainGoToPage function called in main')
	uri = parseData(data)
	console.log(`Got URI: ${uri}`)

	mainGoToPage(uri)
})
