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
var base64 = require("crypto-js/aes");
var UTF8 = require("crypto-js/enc-utf8");
let myWindow = null;
const gotTheLock = app.requestSingleInstanceLock();
const io = require('./io')
const socket = io.sio
const db = require('better-sqlite3')('database.db');
db.prepare('Create table if not exists gmail (gmail, password, key, recover, profile)').run()
const {
	Worker
} = require("worker_threads");
const os = require('systeminformation');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const Store = require('electron-store');
const axios = require('axios').default;
const insert = db.prepare('INSERT INTO gmail (gmail, password, key, recover, profile) VALUES (?, ?, ?, ?, ?)');

const store = new Store({encryptionKey: 'gjeipgsp'});
ipcMain.handle('iv', (event) => {
	return db.prepare('select * from gmail').all()
});

let key = store.get('key')
ipcMain.handle('init',async (event) => {
	if(!key){
		let data = await Promise.all([os.system(), os.diskLayout(), socket.init()])
		db.prepare('Create table if not exists gmail (mail, password, key, recovery, profile)').run()
		key = await socket.key(base64.encrypt(JSON.stringify(data), socket.getSID() + "key").toString())
		store.set('key', key)
		return true
	}else{
		socket.init()
		return true
	}
});
ipcMain.handle('key',async (event) => {
	let dataKey = await socket.getKey(key)
	return dataKey
});
ipcMain.handle('ver',async (event) => {
	let result = await axios.get('https://www.toolmailmmo.com/version')
	return result.data
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
			// devTools: false
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	mainWindow.setMenuBarVisibility(false);
	mainWindow.setResizable(false)
	mainWindow.setTitle("Tool Register Gmail | ToolMailMMO.com");
	// Open the DevTools.


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if (!gotTheLock) {
	app.quit()
} else {
	app.on('second-instance', (event, commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	if (myWindow) {
		if (myWindow.isMinimized()) myWindow.restore()
		myWindow.focus()
	}
	})

	// Create myWindow, load the rest of the app, etc...
	app.on("ready", createWindow);
}


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
const puppeteer = require('puppeteer')
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
	password: "toolmailmmo.com",
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
	// currentPath: app.getPath('exe').replace(/[^\\]+\\?$/,""),
	currentPath: "E:\\my-new-app\\",
	proxy: "",
};
let ISRUNNING = true
const proxy = require('./otp/proxy');


ipcMain.on("click", async (event, arg) => {
	ISRUNNING = true
	while(ISRUNNING){
		if(properties.ip.checked === 3){
			let x = await proxy.getNewProxy(properties.ip.apiTinsoft)
			if (x){
				properties.proxy = x
			}else{
				x = await proxy.getCurrentProxy(properties.ip.apiTinsoft)
				if (x){
					properties.proxy = x
				}else{
					mainWindow.webContents.send('err', "Lỗi proxy")
					return 
				}
			}
		}
		if(properties.ip.checked === 2){
			execSync("netsh interface set interface "+ properties.ip.dcomName +" ADMIN=DISABLE")
			await sleep(2000)
			execSync("netsh interface set interface "+ properties.ip.dcomName +" ADMIN=ENABLE")
			await sleep(2000)
		}
		array.length = 0
		for(let i = 0; i < properties.threads; i++){
			if(ISRUNNING){
				array[i] = newWorker();
				await sleep(3000)
			}
			
		}
		let x  = await Promise.allSettled(array.map(item => item[1]))
	}
	// array[0] = newWorker();
	// let x  = await Promise.allSettled(array.map(item => item[1]))
	// console.log(x)

});

ipcMain.on("stop", async (event, arg) => {
	ISRUNNING = false
	array.map(workers => workers[0].terminate())
})

function newWorker() {
	let arr = [];
	arr[0] = null;
	arr[1] = new Promise((resolve, reject) => {
		// arr[0] = new Worker("./resources/app/.webpack/main/index.worker.js", {workerData: properties});
		arr[0] = new Worker("./src/workers.js", {workerData: properties});
		arr[0].on("message",async (message) => {
			if(message.type === "a"){
				let data = await socket.getA()
				data = base64.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "a", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "b"){
				let data = await socket.getB()
				data = base64.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "b", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "c"){
				let data = await socket.getC()
				data = base64.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "c", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "d"){
				let data = await socket.getD()
				data = base64.decrypt(data, escape(socket.getSID().h())); 
				arr[0].postMessage({type: "d", data: JSON.parse(data.toString(UTF8))})
			}
			if(message.type === "add") {
				// list = [message.data].concat(list)
				// store.set('list', list)
				insert.run(message.data.gmail, message.data.password, message.data.key, message.data.recover, message.data.profile)
				mainWindow.webContents.send('update', db.prepare('select * from gmail').all())
			}
			if(message.type === "error") {
				mainWindow.focus()
				mainWindow.moveTop()
				mainWindow.webContents.send('err', message.data)
			}
		});
		arr[0].on("error", (message) => {
			mainWindow.focus()
			mainWindow.moveTop()
			mainWindow.webContents.send('err', message.message)
			
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

ipcMain.on("open", (event, arg) => {
	let pathPuppeteer = puppeteer._projectRoot.concat('\\.local-firefox\\win64-93.0a1\\firefox\\firefox.exe')	
	let pathProfile = app.getPath('exe').replace(/[^\\]+\\?$/,"") + "profile\\" + arg
	exec(pathPuppeteer + " -profile " + pathProfile, (() => {}))
})
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

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }