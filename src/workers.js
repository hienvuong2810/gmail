const {
	parentPort,
	workerData
} = require("worker_threads");
const fs = require("fs");
const { firefox } = require('playwright');
const OTP = require("./otp/OtpStrategy.js");
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
parentPort.on("message", async function(data){
	if (data.type) {
		xPath = data.data
		eventEmitter.emit('ok')
	}
});

if (!fs.existsSync(workerData.currentPath + "profile")) {
	throw Error("Cant find path: " + workerData.currentPath)
}



let proxy = "socks5://" + workerData.proxy
let uuid = uuidv4()
let profile = workerData.currentPath + "profile\\" + uuid
if(workerData.saveProfileChecked){
	try {
		if (!fs.existsSync(profile)) {
			fs.mkdirSync(profile)
		}
	   fs.writeFileSync(profile + "\\" + "prefs.js",
	   'user_pref("media.peerconnection.enabled", "false");\nuser_pref("app.update.disabledForTesting", true);\nuser_pref("app.normandy.first_run", false);\nuser_pref("startup.homepage_welcome_url", "about:blank");\nuser_pref("toolkit.telemetry.reportingpolicy.firstRun", false);\nuser_pref("browser.shell.didSkipDefaultBrowserCheckOnFirstRun", true);\nuser_pref("browser.newtabpage.enabled", false);\nuser_pref("browser.startup.homepage", "about:blank");\nuser_pref("browser.tabs.warnOnClose", false);\nuser_pref("browser.shell.checkDefaultBrowser", false)')
	} catch (e) {
		process.exit(0)
	}
}

async function runEmulator() {
	try {
		await waitToChange('a')
		let nameSelect = name[Math.floor(Math.random() * 10)];
		let hoSelect = ho[Math.floor(Math.random() * 10)];
		let gmail =
			(nameSelect + hoSelect).toLowerCase() + generateString() + generateNumber();

		if (workerData.saveProfileChecked){
			var page = await (await firefox.launchPersistentContext(profile, {
				headless: false,
				proxy: workerData.ip.checked === 3 ? {server: proxy} : undefined
			  })).pages()[0];
		}else {
			const browser = await firefox.launch({
				headless: false,
				proxy: workerData.ip.checked === 3 ? {server: proxy} : undefined
			});
			var page = await browser.newPage();
		}
		await page.goto(xPath[1]);
		await page.waitForSelector(xPath[2], {
			visible: true,
		});

		await page.type(xPath[2], hoSelect);

		await page.waitForTimeout(2000);

		await page.type(xPath[3], nameSelect);

		await page.waitForTimeout(2000);

		await page.type(xPath[4], gmail);

		await page.waitForTimeout(2000);

		await page.type(xPath[5], workerData.password);

		await page.waitForTimeout(2000);

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
				if (typeof orderID === "string") {
					parentPort.postMessage({
						type: "error", data: orderID
					})
					return;
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
				await page.click(xPath[2])
				//(await page.$x(xPath[2]))[0].click();
				await page.waitForTimeout(3000);
				lengt = (await page.$$(xPath[3])).length
				flag = lengt !== 0
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
				await page.click(xPath[4])
				//(await page.$x(xPath[4]))[0].click();
				await page.waitForTimeout(2000);
			} else {

				await page.waitForSelector(xPath[5], {
					visible: true,
				});

				await page.type(xPath[5], code);
				await page.waitForTimeout(2000);
				await page.click(xPath[6])
				//(await page.$x(xPath[6]))[0].click();
			}
		} while (!checkSMS);


		// object 3
		await waitToChange('c')
		await page.waitForTimeout(2000);
		await page.waitForSelector(xPath[1], {
			visible: true,
		})
		if (workerData.deletePhoneChecked) {
			await page.waitForTimeout(1000);
			await page.click(xPath[1], {
				clickCount: 3
			});
			await page.keyboard.press(xPath[2]);
		}

		await page.waitForTimeout(2000);
		//mail recover
		if (workerData.mailRecoverChecked) {
			await page.type(xPath[3], workerData.mailRecover);
			await page.waitForTimeout(2000);
		}

		await page.selectOption(xPath[4], Math.floor(Math.random() * (2 - 1 + 1) + 1).toString());
		await page.waitForTimeout(2000);

		await page.waitForTimeout(1000);
		await page.type(xPath[5], Math.floor(Math.random() * (25 - 1 + 1) + 1).toString());
		await page.waitForTimeout(2000);


//		await page.click(xPath[6]);
		await page.waitForTimeout(1000);
		await page.selectOption(xPath[6], Math.floor(Math.random() * (12 - 1 + 1) + 1).toString());
		await page.waitForTimeout(2000);


		await page.waitForTimeout(1000);
		await page.type(xPath[7], Math.floor(Math.random() * (1990 - 2005 + 1) + 2005).toString());
		await page.waitForTimeout(2000);

		await page.click(xPath[8])
	//	(await page.$x(xPath[8]))[0].click();
		await page.waitForTimeout(2000);

		// object 4
		await waitToChange('d');
		await page.waitForSelector(xPath[1], {
			visible: true,
		});

		await page.waitForTimeout(3000);
		await page.click(xPath[1])
		await page.waitForSelector(xPath[2], {
			visible: true
		})
		await page.waitForTimeout(2000);
		// success
		parentPort.postMessage({
			type: "add", data: {
				key: uuid,
				gmail: gmail + '@gmail.com',
				password: workerData.password,
				recover: workerData.mailRecover,
				profile: workerData.saveProfileChecked ? 1 : 0
			}
		})
		// 	// // // lessecure apps
		if (workerData.notSecureChecked) {
			await page.goto(xPath[3]);
			await page.waitForSelector(xPath[4], {
				visible: true
			})

			await page.waitForTimeout(2000);
			await page.click(xPath[4])
			//(await page.$x(xPath[4]))[0].click()

			await page.waitForTimeout(3000);
		}

		await page.waitForTimeout(3000);
		if (workerData.avatar.checked && workerData.avatar.url){
			await browser.goto('https://myaccount.google.com');
			await browser.waitForTimeout(2000)
			await browser.click('//html/body/div[2]/header/div[2]/div[3]/div[1]/div[2]/div')
			await browser.waitForTimeout(2000)

			await browser.click('//html/body/div[2]/header/div[2]/div[4]/div[1]/div[1]/div')
			await browser.waitForTimeout(2000)
			let frame = await browser.frame({ url: /.*docs.google.com\/picker.*/ })
			await frame.setInputFiles("//input[@type='file']", workerData.avatar.url)
			await browser.waitForTimeout(2000)
			await frame.waitForSelector('//*[@id="picker:ap:3"]', {
				state: 'visible'
			})
			await browser.waitForTimeout(2000)
			await frame.click('//*[@id="picker:ap:3"]')
			await page.waitForTimeout(5000);
		}

		if(workerData.openImapPOP3Checked){
			await browser.goto('https://youtube.com');
			await browser.waitForTimeout(3000)
			await browser.click('//*[@id="avatar-btn"]')
			await browser.waitForTimeout(3000)
			await browser.click('//yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[1]')
			await browser.waitForTimeout(3000)
			await browser.click('//ytd-channel-creation-dialog-renderer/div/div[5]/ytd-button-renderer[2]/a/tp-yt-paper-button')
			await browser.waitForTimeout(3000)
			await browser.waitForNavigation({waitUntil: 'networkidle'})
			await browser.waitForTimeout(3000)
		}
		process.exit(1)
	} catch(err) {

		parentPort.postMessage({
			type: "error", data: err.message
		})
		fs.writeFileSync('error.log', err.toString())
		throw new Error(err.message)
	}
}

runEmulator()

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


function waitToChange(type) {
	parentPort.postMessage({ type: type })
	return new Promise((resolve, reject) => {
		eventEmitter.on('ok', () => {
			resolve()
		})
	})
}
