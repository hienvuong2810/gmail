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
let shareData = null;
Object.setPrototypeOf(workerData.sms, OTP.SMS.prototype);
shareData = workerData.sms;
shareData.setStrategy(workerData.otpChoose);


const { v4: uuidv4 } = require('uuid');

let xPath = {}
parentPort.on("message", async (data) => {
	if(data.type){
		xPath = data.data
		eventEmitter.emit('ok')
	}
});

if(!fs.existsSync(workerData.currentPath + "\\profile")){
	throw Error
}
let proxy = workerData.proxy.split(':')
let uuid = uuidv4()
let profile = workerData.currentPath + "\\profile\\" + uuid 
try {
	if(!fs.existsSync(profile)){
		fs.mkdirSync(profile)
	}
	fs.writeFileSync(profile + "\\" + "prefs.js", 
	`user_pref("media.peerconnection.enable", "false");
	user_pref("app.update.disabledForTesting", true);
	user_pref("app.normandy.first_run", false);
	user_pref("startup.homepage_welcome_url", "about:blank");
	user_pref("browser.newtabpage.enabled", false);
	user_pref("browser.startup.homepage", "about:blank");
	user_pref("browser.tabs.warnOnClose", false);
	user_pref("privacy.resistFingerprinting", true);
	` + (workerData.ip.checked === 3 ? 
	`user_pref("network.proxy.socks", "${proxy[0]}");
	user_pref("network.proxy.socks_port",${proxy[1]});
	user_pref("network.proxy.type", 1);` : ""))
}catch(e){
	console.log(e)
	process.exit(0)
}

console.log(proxy)
async function a() {
	let x = await puppeteer.launch({
		headless: false,
		args: ["-wait-for-browser"],
		
		product: "firefox",
		userDataDir: profile
	});
	let page = await x.pages()
	page = page[0];
}
a()
async function runEmulator() {
	await waitToChange('a')
	let nameSelect = name[Math.floor(Math.random() * 10)];
	let hoSelect = ho[Math.floor(Math.random() * 10)];
	let gmail =
		(nameSelect + hoSelect).toLowerCase() + generateString() + generateNumber();
	const browser = await puppeteer.launch({
		headless: false,
		args: ["-wait-for-browser"],
		product: "firefox",
		userDataDir: profile
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
	await waitToChange('b')
	let orderID;
	let checkSMS = false;
	let flag = false;
	let lengt = 0
	do {
		do {
			orderID = await shareData.getPhone();
			if(typeof orderID === "string"){
				throw Error(orderID)
			}
			await page.waitForTimeout(2000);
			await page.waitForSelector(xPath[1], {
				visible: true,
			});
			await page.waitForTimeout(2000);
			await page.click(xPath[1], {
				clickCount: 3
			});
			await page.type(xPath[1], orderID[1]);
			await page.waitForTimeout(2000);
			(await page.$x(xPath[2]))[0].click();
			await page.waitForTimeout(3000);
			lengt = (await page.$x(xPath[3])).length
			flag =  lengt !== 0
			await page.waitForTimeout(3000);
		} while (flag);

		let code;
		// each count is 2s
		for (let count = 0; count < 30; count++) {
			code = await shareData.getCode(orderID[0]);
			await page.waitForTimeout(2000);
			if (!code) {
				continue;
			}
			checkSMS = true;
			break;
		}
		if (checkSMS == false) {
			
			shareData.cancel(orderID[0]);
			(await page.$x(xPath[4]))[0].click();
			await page.waitForTimeout(2000);
		} else {
			
			await page.waitForSelector(xPath[5], {
				visible: true,
			});
			await page.click(xPath[5]);
			await page.type(xPath[5], code);
			await page.waitForTimeout(2000);
			(await page.$x(xPath[6]))[0].click();
		}
	} while (!checkSMS);


	// object 3
	await waitToChange('c')
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
		await page.click(xPath[3]);
		await page.type(xPath[3], workerData.mailRecover);
		await page.waitForTimeout(2000);
	}



	await page.click(xPath[4]);
	await page.select(xPath[4], Math.floor(Math.random() * (2 - 1 + 1) + 1).toString());
	await page.waitForTimeout(2000);


	await page.click(xPath[5]);
	await page.type(xPath[5], Math.floor(Math.random() * (25 - 1 + 1) + 1).toString());
	await page.waitForTimeout(2000);


	await page.click(xPath[6]);
	await page.select(xPath[6], Math.floor(Math.random() * (12 - 1 + 1) + 1).toString());
	await page.waitForTimeout(2000);


	await page.click(xPath[7]);
	await page.type(xPath[7], Math.floor(Math.random() * (1990 - 2005 + 1) + 2005).toString());
	await page.waitForTimeout(2000);




	(await page.$x(xPath[8]))[0].click();
	await page.waitForTimeout(2000);

	// object 4
	await waitToChange('d');
	await page.waitForXPath(xPath[1], {
		visible: true,
	});

	// await page.evaluate(async () => {
	// 	let space = 100		
	// 	for(let i = 0; i< 10; i++){	
	// 		window.scroll(0,space)
	// 		space+=200
	// 		await new Promise(resolve => { setTimeout(resolve, 500); });
	// 	}
	// });
	
	(await page.$x(xPath[1]))[0].click();

	await page.waitForXPath(xPath[2], {
			visible: true
		})
	await page.waitForTimeout(2000);
		// success
	parentPort.postMessage({type: "add", data: {
		key: uuid,
		gmail: gmail  + '@gmail.com',
		password: workerData.password,
		recover: workerData.mailRecover
		}} 
	)
	// 	// // // lessecure apps
	if (workerData.notSecureChecked){
		await page.goto(xPath[3]);
		await page.waitForXPath(xPath[4], {
			visible: true
		})
	
		await page.waitForTimeout(2000);
		(await page.$x(xPath[4]))[0].click()

		await page.waitForTimeout(3000);
	}
	await browser.close()
	process.exit(1)
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