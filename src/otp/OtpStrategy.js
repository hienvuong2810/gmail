const axios = require('axios').default;

export var  Shipping = function() {
    this.otpProvider = "";
    this.apiKey = "b03e8f37f74e7fd0510f513b0922c9c0";
};
 
 Shipping.prototype = {
    setStrategy: function(otpProvider) {
        this.otpProvider = otpProvider;
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
 
export var OtpSMS = function() {
    this.getInfo = async function(apiKey) {
        // calculations...
        var result = await axios.get("http://otpsim.com/api/users/balance?token="+ apiKey)
        return result.data
       
    }
};
 
export var Chothuesimcode = function() {
    this.getInfo = function() {
        // calculations...
        return "$39.40";
    }
};
