const {
	parentPort,
	workerData
} = require("worker_threads");
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
//const puppeteer = require("puppeteer")
let shareData = null;
parentPort.on("message", async (data) => {
	if (!data.case) {
		console.log(data.prop);
		Object.setPrototypeOf(data.prop, OTP.SMS.prototype);
		shareData = data.prop;
		shareData.setStrategy(1);
		var result = await shareData.getInfo();
		console.log(result);
	} else if (data.case === "show") {
		console.log(shareData);
	}
});

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
	await page.goto("https://accounts.google.com/signup");
	await page.waitForSelector("#lastName", {
		visible: true,
	});

	await page.click("#lastName");
	await page.type("#lastName", hoSelect);

	await page.waitForTimeout(2000);
	await page.click("#firstName");
	await page.type("#firstName", nameSelect);

	await page.waitForTimeout(2000);
	await page.click("#username");
	await page.type("#username", gmail);

	await page.waitForTimeout(2000);
	await page.click("[name='Passwd']");
	await page.type("[name='Passwd']", "Vuong2310.");

	await page.waitForTimeout(2000);
	await page.click("[name='ConfirmPasswd']");
	await page.type("[name='ConfirmPasswd']", "Vuong2310.");

	await page.waitForTimeout(2000);
	await page.click("[name='accountDetailsNext']");

	let orderID;
	let checkSMS = false;

	do {
		do {
			orderID = await shareData.getPhone();
			await page.waitForSelector("#phoneNumberId", {
				visible: true,
			});
			await page.click("#phoneNumberId", {
				clickCount: 3
			});
			await page.tpye("#phoneNumberId", orderID[1]);
			await page.waitForTimeout(2000);
			await page
				.$x(
					"/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div/button"
				)[0]
				.click();
			await page.waitForTimeout(3000);
		} while ((await page.$x('//div[@class="o6cuMc"]').length) !== 0);

		let code;
		// each count is 2s
		for (let count = 0; count < 30; count++) {
			code = await shareData.getCode(orderID[0]);
			await page.waitForTimeout(2000);
			if (code) {
				continue;
			}
			checkSMS = true;
			break;
		}
		if (checkSMS == false) {
			shareData.cancel(orderID[0]);
			await page.$x('(//div[@class="VfPpkd-RLmnJb"])[1]')[0].click();
			await page.waitForTimeout(2000);
		} else {
			await page.waitForSelector("#code", {
				visible: true,
			});
			await page.click("#code");
			await page.type("#code", code);
			await page.waitForTimeout(2000);
			await page.$x('/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[2]/div[2]/div[1]/div/div/button')[0].click();
		}
	} while (!checkSMS);
}
runEmulator();

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