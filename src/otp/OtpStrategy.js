const axios = require('axios').default;
 
export var OtpSMS = function() {
    this.getInfo = async function(apiKey) {
        // calculations...
        var result = await axios.get("http://otpsim.com/api/users/balance?token="+ apiKey)
        return result.data
    }
    this.getPhone = async function(apiKey){
        var result = await axios.get("http://otpsim.com/api/phones/request?token="+apiKey+"&service=3")
        return result.data
    }
    this.getCode = async function(apiKey, id){
        var result = await axios.get("http://otpsim.com/api/sessions/"+id+"?token="+apiKey)
        return result.data
    }
    this.cancel = async function(apiKey, id){
        var result = await axios.get("http://otpsim.com/api/sessions/cancel?session="+id+"?token="+apiKey)
        return result.data
    }
};
 
export var Chothuesimcode = function() {
    this.getInfo = async function(apiKey) {
        var result = await axios.get("https://chothuesimcode.com/api?act=account&apik="+ apiKey)
        return result.data
    }
    this.getPhone = async function(apiKey){
        var result = await axios.get("https://chothuesimcode.com/api?act=number&apik="+apiKey+"&appId=1005")
        return result.data
    }
    this.getCode = async function(apiKey, id){
        var result = await axios.get("https://chothuesimcode.com/api?act=code&apik="+apiKey+"&id="+id)
        return result.data
    }
    this.cancel = async function(apiKey, id){
        var result = await axios.get("https://chothuesimcode.com/api?act=expired&apik="+apiKey+"&id="+id)
        return result.data
    }
};

export var  SMS = function() {
    this.otpProvider = "";
    this.apiKey = "b03e8f37f74e7fd0510f513b0922c9c0";
};
const otpSMS = new OtpSMS()
const ctsc = new Chothuesimcode()

SMS.prototype = {
    
    setStrategy: function(otpProvider) {
        if(otpProvider == 1){
            this.otpProvider = otpSMS;
        }else{
            this.otpProvider = ctsc;
        }
    },
    setApiKey: function(apikey){
        this.apiKey = apikey;
    },
    getInfo: function() {
        return this.otpProvider.getInfo(this.apiKey);
    },
    getPhone: function(){
        return this.otpProvider.getPhone(this.apiKey);
    },
    getCode: function(id){
        return this.otpProvider.getCode(this.apiKey, id)
    },
    cancel: function(id){
        return this.otpProvider.cancel(this.apiKey, id)
    }
};