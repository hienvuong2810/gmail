const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require("fs")
const { ipcMain } = require('electron')
// const { Cluster } = require('puppeteer-cluster')
// const vanillaPuppeteer = require('puppeteer')
// const puppeteerAfp = require('puppeteer-afp');
const {Worker} = require("worker_threads");

// const { addExtra } = require('puppeteer-extra')
// const Stealth = require('puppeteer-extra-plugin-stealth')
// require("puppeteer-extra-plugin-stealth")
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
const bytenode = require('bytenode');
const { exitCode } = require('process');
bytenode.compileFile({
  filename: './src/workers.js',
  output: './src/workers-byte.jsc',
  compileAsModule: true
})
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
  mainWindow.setMenuBarVisibility(false)
  //mainWindow.setResizable(false)
  mainWindow.setTitle("Register and Feed Gmail | SoftwareMMO.com")
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
async function main() {
  // Create a custom puppeteer-extra instance using `addExtra`,
  // so we could create additional ones with different plugin config.
  // const puppeteer = addExtra(vanillaPuppeteer)
  // //puppeteer.use(Stealth())

  // const browser = await puppeteer.launch({ headless: false,
  //   args: [
  //     '-wait-for-browser'
  //     ]
  // //   ,     args: [
  // //   '--no-sandbox',
  // //   '--disable-setuid-sandbox',
  // //   '--disable-dev-shm-usage',
  // //   '--disable-accelerated-2d-canvas',
  // //   '--no-first-run',
  // //   '--no-zygote',
  // //   '--single-process', // <- this one doesn't works in Windows
  // //   '--disable-gpu'
  // // ]
  // , product: "firefox"})

  // // .then(async browser => {
  //  let page = await browser.pages()
  //  page = page[0]
  
  // //   console.log(`Testing the stealth plugin..`)
  //   await page.goto('https://accounts.google.com/signin/v2')
  //   await page.waitForTimeout(3000)
  //   await page.click("#identifierId")
  //   await page.type("#identifierId", "hienvuong2810")
  //   await page.waitForTimeout(2000)
  //   await page.click("#identifierNext")
  //   await page.waitForSelector("#password", {visible: true})
  //   await page.waitForTimeout(2000)
  //   await page.click("#password")
  //   await page.type("#password", "HienVuong2310.", {delay: 500})
  //   await page.waitForTimeout(2000)
  //   await page.click("#passwordNext")
    // await page.goto("https://fingerprintjs.com/demo/", {waitUntil: "networkidle0"})
    // await page.waitForTimeout(15000)
    // await page.screenshot({path: "fp.png"})
    // console.log(`All done, check the screenshots. ✨`)
  //})
  // Launch cluster with puppeteer-extra
  // const cluster = await Cluster.launch({
  //   puppeteerOptions:{
  //     headless: false
  //   },
  //   puppeteer,
  //   maxConcurrency: 1,
  //   concurrency: Cluster.CONCURRENCY_CONTEXT
  // })

  // // Define task handler
  // await cluster.task(async ({ page, data: url }) => {
  //   await page.goto(url)
  //   console.log(1)
  //   const { hostname } = new URL(url)
    
  //   await page.screenshot({ path: `${hostname}.png`, fullPage: true })
  //   cluster.idle()
  // })

  // Queue any number of tasks
  // cluster.queue('https://bot.sannysoft.com')
  // cluster.queue('http://www.wikipedia.org/')

  
  // console.log(`All done, check the screenshots. ✨`)
}

// Let's go
array = []
ipcMain.on("click",  (event, arg) => {
  
    for(x = 0; x< 1 ; x++ ){

      let worker = new Worker(
        `
          console.log("hello world")
        `
        ,
      { eval: true });
   
      // worker1 = new Worker("./src/work.js");
      // worker2 = new Worker("./src/work.js");
      worker.on("message", result => {
        console.log(`${result.num}th Fibonacci Number: ${result.fib} & ${worker.threadId}`);
        

      });
      worker.on("exit",exitCode =>{
        console.log(exitCode)
      })
      worker.postMessage({num: 2});
    }
   

})


