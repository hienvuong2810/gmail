"use strict";
const {
	app,
	BrowserWindow
} = require("electron");
const path = require("path");
const fs = require("fs");
const {
	ipcMain
} = require("electron");
var AES = require("crypto-js/aes");
var UTF8 = require("crypto-js/enc-utf8");
let myWindow = null;
const gotTheLock = app.requestSingleInstanceLock();
const io = require('./io')
const socket = io.sio

const {
	Worker
} = require("worker_threads");
const os	 = require('systeminformation');

const Store = require('electron-store');
const store = new Store({encryptionKey: 'gjeipgsp'});
let list = store.get('list')
ipcMain.handle('iv', (event) => {
	return [store.get('key'), store.get('list')];
});
ipcMain.handle('init',async (event) => {
	let key = store.get('key')
	if(!key){
		let data = await Promise.all([os.system(), os.diskLayout(), socket.init()])
		key = await socket.key(AES.encrypt(JSON.stringify(data), socket.getSID() + "key").toString())
		store.set('key', key)
		return true
	}else{
		socket.init()
		return true
	}
});
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

// const bytenode = require("bytenode");
const {
	exitCode
} = require("process");
// bytenode.compileFile({
// 	filename: "./src/workers.js",
// 	output: "./src/workers-byte.jsc",
// 	compileAsModule: true,
// });
let mainWindow = null
const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	mainWindow.setMenuBarVisibility(false);
	//mainWindow.setResizable(false)
	mainWindow.setTitle("Tool Register Gmail | ToolMailMMO.com");
	// Open the DevTools.
	mainWindow.webContents.openDevTools();


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// Let's go
if(!fs.existsSync("profile")){
	fs.mkdirSync("profile")
}
let array = [];

const OTP = require("./otp/OtpStrategy");
const SMS = new OTP.SMS();

let properties = {
	otpChoose: 0,
	sms: SMS,
	ip: {
		ipAddress: "0.0.0.0",
		checked: 1,
		dcomName: "",
		apiTinsoft: "ad9565342ced6482a3461ab1de4a9eaa",
	},
	passwordDefaultChecked: false,
	password: "softwaremmo.com",
	notSecureChecked: true,
	openImapPOP3Checked: true,
	saveProfileChecked: true,
	deletePhoneChecked: true,
	avatar: {
		checked: false,
		url: "",
	},
	mailRecoverChecked: true,
	mailRecover: "",
	threads: 1,
	userPath: app.getPath("userData"),
	currentPath: app.getAppPath(),
	proxy: "1:1"
};

const proxy = require('./otp/proxy')

ipcMain.on("click", async (event, arg) => {
	// if(properties.ip.checked === 3){
	// 	let x = await proxy.getNewProxy(properties.ip.apiTinsoft)
	// 	if (x){
	// 		properties.proxy = x
	// 	}else{
	// 		x = await proxy.getNewProxy(properties.ip.apiTinsoft)
	// 		if (x){
	// 			properties.proxy = x
	// 		}
	// 	}
	// }
	console.log(1)
	array[0] = newWorker();
	let x  = await Promise.allSettled(array.map(item => item[1]))
	console.log(x)

});

function newWorker() {
	let arr = [];
	arr[0] = null;
	arr[1] = new Promise((resolve, reject) => {
		arr[0] = new Worker("./src/workers.js", {workerData: properties});
		arr[0].on("message",async (message) => {
			if(message.type === "a"){
				let data = await socket.getA()
				data = AES.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "a", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "b"){
				let data = await socket.getB()
				data = AES.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "b", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "c"){
				let data = await socket.getC()
				data = AES.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "c", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "d"){
				let data = await socket.getD()
				data = AES.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "d", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "add") {
				list = [message.data].concat(list)
				store.set('list', list)
				mainWindow.webContents.send('update', list)
			}
		});
		arr[0].on("error", (message) => {
			mainWindow.webContents.send('err', message.message)
			arr[0].terminate()
		});
		arr[0].on("exit", (exitCode) => {
			if (exitCode == 1) {
				resolve("s");
			} else {
				reject("f");
			}
		});
	});
	return arr;
}


ipcMain.on("u", (event, arg) => {
	switch (arg.case) {
		case 1:
			properties.otpChoose = arg.value;
			// SMS.setStrategy(arg.value);
			break;
		case 2:
			// properties.otpAPIKEY = arg.value;
			SMS.setApiKey(arg.value);
			break;
		case 3:
			properties.ip.checked = arg.value;
			break;
		case 4:
			properties.ip.dcomName = arg.value;
			break;
		case 5:
			properties.ip.apiTinsoft = arg.value;
			break;
		case 6:
			properties.passwordDefaultChecked = arg.value;
			break;
		case 7:
			properties.password = arg.value;
			break;
		case 8:
			properties.notSecureChecked = arg.value;
			break;
		case 9:
			properties.openImapPOP3Checked = arg.value;
			break;
		case 10:
			properties.saveProfileChecked = arg.value;
			break;
		case 11:
			properties.deletePhoneChecked = arg.value;
			break;
		case 12:
			properties.avatar.checked = arg.value;
			break;
		case 13:
			properties.avatar.url = arg.value;
			break;
		case 14:
			properties.mailRecoverChecked = arg.value;
			break;
		case 15:
			properties.mailRecover = arg.value;
			break;
		case 16:
			properties.threads = arg.value;
			break;
		default:
			break;
	}
});
String.prototype.h = function(){
	var hash = 0, i, chr;
	var result = ""
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
	  chr   = this.charCodeAt(i);
	  hash  = ((hash << 5) - hash) + chr;
	  hash |= 0; // Convert to 32bit integer
	  result += String.fromCharCode(hash)
	}
	return result;
}