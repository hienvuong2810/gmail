const {parentPort} = require("worker_threads");
//const puppeteer = require("puppeteer")
parentPort.on("message", data => {
  if(!data.case){
      parentPort.postMessage({num: data.num, fib: getFib(data.num)});
      console.log("hello wwww"  + print(2))
      process.exit()
  } else if(data.case === "run"){
    runEmulator()

  }
  
});
function print(index){
  x= "214"
  return x[index]
}
function getFib(num) {
  if (num === 0) {
    return 0;
  }
  else if (num === 1) {
    return 1;
  }
  else {
    return getFib(num - 1) + getFib(num - 2);
  }
}

async function runEmulator(){
    const browser = await puppeteer.launch({ headless: false,
    args: [
      '-wait-for-browser'
      ]
  //   ,     args: [
  //   '--no-sandbox',
  //   '--disable-setuid-sandbox',
  //   '--disable-dev-shm-usage',
  //   '--disable-accelerated-2d-canvas',
  //   '--no-first-run',
  //   '--no-zygote',
  //   '--single-process', // <- this one doesn't works in Windows
  //   '--disable-gpu'
  // ]
  , product: "firefox"})

}