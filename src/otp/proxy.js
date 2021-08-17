const axios = require('axios').default;

module.exports = {
    getNewProxy:async function (apikey){
        let result =  await axios.post("https://tmproxy.com/api/proxy/get-new-proxy", {
            "api_key": apikey
        })
        if(result.data.code === 0){
            return result.data.data.socks5
        }else{
            return false
        }
    },
    getCurrentProxy:async function (apikey){
        let result =  await axios.post("https://tmproxy.com/api/proxy/get-current-proxy", {
            "api_key": apikey
        })
        if(result.data.code === 0){
            return result.data.data.socks5
        }else{
            return false
        }
    }
}