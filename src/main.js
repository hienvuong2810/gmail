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
const isDev = require("electron-is-dev");

let myWindow = null;
const gotTheLock = app.requestSingleInstanceLock();

const {
	Worker
} = require("worker_threads");

// const { addExtra } = require('puppeteer-extra')
// const Stealth = require('puppeteer-extra-plugin-stealth')
// require("puppeteer-extra-plugin-stealth")
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

const bytenode = require("bytenode");
const {
	exitCode
} = require("process");
bytenode.compileFile({
	filename: "./src/workers.js",
	output: "./src/workers-byte.jsc",
	compileAsModule: true,
});

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
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
	mainWindow.setTitle("Register and Feed Gmail | SoftwareMMO.com");
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
const puppeteer = require("puppeteer");


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// Let's go
let array = [];
let properties = {
	otpChoose: 0,
	otpAPIKEY: "",
	ip: {
		ipAddress: "0.0.0.0",
		checked: 1,
		dcomName: "",
		apiTinsoft: "",
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
	path: app.getPath("userData")
};

const OTP = require("./otp/OtpStrategy");
const SMS = new OTP.SMS();

// const browser = puppeteer.launch({
// 	headless: false,
// 	args: ["-wait-for-browser",
// 	],
// 	extraPrefsFirefox: {
// 		'dom.webdriver.enabled': false,
// 		'useAutomationExtension': false,
// 		'marionette.enabled': false,
// 	},
// 	product: "firefox",
// 	userDataDir: "E:\\profile"
// });
ipcMain.on("click", async (event, arg) => {
	// var result =  await SMS.getInfo()
	// console.log(result)
	
	// array[0] = new Worker("./src/work.js")
	// array[0].
	// for(x = 0; x< 1 ; x++ ){

	//   let worker = new Worker(
	//     `
	//       console.log("hello world")
	//     `
	//     ,
	//   { eval: true });

	//   // worker1 = new Worker("./src/work.js");
	//   // worker2 = new Worker("./src/work.js");
	//   worker.on("message", result => {
	//     console.log(`${result.num}th Fibonacci Number: ${result.fib} & ${worker.threadId}`);

	//   });
	//   worker.on("exit",exitCode =>{
	//     console.log(exitCode)
	//   })
	//   worker.postMessage({num: 2});
	// }
});

function newWorker() {
	let arr = [];
	arr[0] = null;
	arr[1] = new Promise((resolve, reject) => {
		arr[0] = new Worker("./src/workers.js", {workerData: properties});
		arr[0].on("message", (message) => {});
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

array[0] = newWorker();
array[0][0].postMessage({prop: SMS})
ipcMain.on("u", (event, arg) => {
	switch (arg.case) {
		case 1:
			properties.otpChoose = arg.value;
			SMS.setStrategy(arg.value);
			break;
		case 2:
			properties.otpAPIKEY = arg.value;
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