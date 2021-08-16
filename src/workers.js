"use strict";
const {
	parentPort,
	workerData
} = require("worker_threads");
const fs = require("fs");
const puppeteer = require("puppeteer");
const OTP = require("./otp/OtpStrategy");
const name = [
	"Smith",
	"Brown",
	"Taylor",
	"Singh",
	"Anderson",
	"Davies",
	"Thomas",
	"Evans",
	"Wilson",
	"Brown",
];
const ho = [
	"James",
	"John",
	"David",
	"Joseph",
	"Patricia",
	"Linda",
	"Jessica",
	"Sarah",
	"Susan",
	"Mary",
];

const events = require('events');
const eventEmitter = new events.EventEmitter();

const { v4: uuidv4 } = require('uuid');
let shareData = null;
let xPath = {}
parentPort.on("message", async (data) => {
	if(data.type){
		xPath = data.data
		eventEmitter.emit('ok')
	}
});

// if(!fs.existsSync(workerData.currentPath + "\\profile")){
// 	// throww Error
// }
// let uuid = uuidv4()
// let profile = workerData.currentPath + "\\profile\\" + uuid 
// try {
// 	if(!fs.existsSync(profile)){
// 		fs.mkdirSync(profile)
// 		fs.writeFileSync(profile + "\\" + "pref.js")
// 		process.exit(1)
// 	}
// }catch(e){
// 	console.log("Err 2021")
// 	process.exit(0)
// }

// console.log(workerData.sms);
// Object.setPrototypeOf(workerData.sms, OTP.SMS.prototype);
// shareData = workerData.sms;
// shareData.setStrategy(workerData.otpChoose);
// console.log(shareData)


async function a(){
	await waitToChange('a')
	console.log('preXpath')
	console.log(xPath)
	console.log('afterXpath')
}
a()


// parentPort.postMessage({type: "add", data: {
// 	key: generateString() + '@gmail.com',
// 	gmail: 'hienvuong2810@gmail.com',
// 	password: 'heusoghiesohg',
// 	recover: 'hienvuong2810@gmail.com'
//   }} 
// )
async function runEmulator() {
	let nameSelect = name[Math.floor(Math.random() * 10)];
	let hoSelect = ho[Math.floor(Math.random() * 10)];
	let gmail =
		(nameSelect + hoSelect).toLowerCase() + generateString() + generateNumber();
	const browser = await puppeteer.launch({
		headless: false,
		args: ["-wait-for-browser"],
		product: "firefox",
	});
	let page = await browser.pages();
	page = page[0];
	await page.goto(xPath[1]);
	await page.waitForSelector(xPath[2], {
		visible: true,
	});

	await page.click(xPath[2]);
	await page.type(xPath[2], hoSelect);

	await page.waitForTimeout(2000);
	await page.click(xPath[3]);
	await page.type(xPath[3], nameSelect);

	await page.waitForTimeout(2000);
	await page.click(xPath[4]);
	await page.type(xPath[4], gmail);

	await page.waitForTimeout(2000);
	await page.click(xPath[5]);
	await page.type(xPath[5], workerData.password);

	await page.waitForTimeout(2000);
	await page.click(xPath[6]);
	await page.type(xPath[6], workerData.password);

	await page.waitForTimeout(2000);
	await page.click(xPath[7]);

	// object 2
	let orderID;
	let checkSMS = false;
	let flag = false;
	let lengt = 0
	do {
		do {
			console.log("get phone")
			orderID = await shareData.getPhone();
			await page.waitForTimeout(2000);
			console.log("waiting")
			await page.waitForSelector(xPath[1], {
				visible: true,
			});
			console.log("typing")
			await page.waitForTimeout(2000);
			await page.click(xPath[1], {
				clickCount: 3
			});
			await page.type(xPath[1], orderID[1]);
			console.log("click next")
			await page.waitForTimeout(2000);
			(await page.$x(xPath[2]))[0].click();
			await page.waitForTimeout(3000);
			lengt = (await page.$x(xPath[3])).length
			flag =  lengt !== 0
			console.log("flag "+ flag)
			console.log("lengt "+ lengt)
			await page.waitForTimeout(3000);
		} while (flag);

		let code;
		// each count is 2s
		for (let count = 0; count < 30; count++) {
			code = await shareData.getCode(orderID[0]);
			console.log("get code: " + code)
			await page.waitForTimeout(2000);
			if (!code) {
				console.log("get code not ok")
				continue;
			}
			checkSMS = true;
			break;
		}
		if (checkSMS == false) {
			console.log("get code fail")
			shareData.cancel(orderID[0]);
			(await page.$x(xPath[4]))[0].click();
			await page.waitForTimeout(2000);
		} else {
			console.log("fill code")
			await page.waitForSelector(xPath[5], {
				visible: true,
			});
			await page.click(xPath[5]);
			await page.type(xPath[5], code);
			await page.waitForTimeout(2000);
			(await page.$x(xPath[6]))[0].click();
		}
	} while (!checkSMS);
	console.log("clear phone")

	// object 3
	await page.waitForTimeout(2000);
	await page.waitForSelector(xPath[1], {
		visible: true,
	})
	if(workerData.deletePhoneChecked){
		await page.waitForTimeout(1000);
		await page.click(xPath[1], {
			clickCount: 3
		});
		await page.keyboard.press(xPath[2]);
	}

	await page.waitForTimeout(2000);
	//mail recover
	if(workerData.mailRecoverChecked){
		await page.click(xPath[3])
		await page.type(xPath[3], workerData.mailRecover)
		await page.waitForTimeout(2000);
	}


	console.log("fill gender")
	await page.click(xPath[4]);
	await page.select(xPath[4], Math.floor(Math.random() * (2 - 1 + 1) + 1).toString());
	await page.waitForTimeout(2000);

	console.log("fill day")
	await page.click(xPath[5]);
	await page.type(xPath[5], Math.floor(Math.random() * (25 - 1 + 1) + 1).toString());
	await page.waitForTimeout(2000);

	console.log("fill month")
	await page.click(xPath[6]);
	await page.select(xPath[6], Math.floor(Math.random() * (12 - 1 + 1) + 1).toString());
	await page.waitForTimeout(2000);

	console.log("fill year")
	await page.click(xPath[7]);
	await page.type(xPath[7], Math.floor(Math.random() * (1990 - 2005 + 1) + 2005).toString());
	await page.waitForTimeout(2000);


	console.log("click next");

	(await page.$x(xPath[8]))[0].click();
	await page.waitForTimeout(2000);

	// object 4
	await page.waitForXPath(xPath[1], {
		visible: true,
	})

	await page.evaluate(async () => {
		let space = 100		
		for(let i = 0; i< 10; i++){	
			window.scroll(0,space)
			space+=200
			console.log('scoll')
			await new Promise(resolve => { setTimeout(resolve, 500); });
		}
	})
	console.log('finish')
	(await page.$x(xPath[1]))[0].click()

	await page.waitForXPath(xPath[2], {
			visible: true
		})
		// success
	// 	// // // lessecure apps
	await page.goto(xPath[3]);
	await page.waitForXPath(xPath[4], {
		visible: true
	})
	console.log('ok')
	await page.waitForTimeout(2000);
	(await page.$x(xPath[4]))[0].click()
	console.log('clicked')
}
//runEmulator();

function generateString() {
	let chars = "abcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (var i = 0; i < 2; i++) {
		result += chars.charAt(Math.floor(Math.random() * 26));
	}
	return result;
}

function generateNumber() {
	return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}


function waitToChange(type){
	parentPort.postMessage({type: type})
	return new Promise((resolve, reject) => {
		eventEmitter.on('ok', () => {
			resolve()
		})
	})
}