const axios = require('axios').default;

var OtpSMS = function () {
    this.getInfo = async function (apiKey) {
        var result = await axios.get("http://otpsim.com/api/users/balance?token=" + apiKey)
        return result.data.data.balance
    }
    this.getPhone = async function (apiKey) {
        var result = await axios.get("http://api.codesim.net/api/CodeSim/DangKy_GiaoDich?apikey=" + apiKey + "&dichvu_id=2&so_sms_nhan=1")
        if(result.data.stt === 1){
            return [result.data.data.id_giaodich, result.data.data.phoneNumber]
        }else{
            return result.data.msg
        }
        
    }
    this.getCode = async function (apiKey, id) {
        var result = await axios.get("http://api.codesim.net/api/CodeSim/KiemTraGiaoDich?apikey=" + apiKey + "&giaodich_id=" + id)
        if(result.data.data.listSms.length !== 0){
            return result.data.data.listSms[0].number
        }else{
            return ""
        }
        
    }
    this.cancel = async function (apiKey, id) {
        var result = await axios.get("http://api.codesim.net/api/CodeSim/HuyGiaoDich?apikey=" + apiKey + "&giaodich_id=" + id)
        return result.data
    }
};

var Chothuesimcode = function () {
    this.getInfo = async function (apiKey) {
        var result = await axios.get("https://chothuesimcode.com/api?act=account&apik=" + apiKey)
        return result.data.Result.Balance
    }
    this.getPhone = async function (apiKey) {
        var result = await axios.get("https://chothuesimcode.com/api?act=number&apik=" + apiKey + "&appId=1005")
        if(result.data.ResponseCode === 0){
            return [result.data.Result.Id, result.data.Result.Number]
        }else{
            return result.data.Msg
        }
        
    }
    this.getCode = async function (apiKey, id) {
        var result = await axios.get("https://chothuesimcode.com/api?act=code&apik=" + apiKey + "&id=" + id)
        if(result.data.ResponseCode === 0){
            return result.data.Result.Code
        }else{
            return ""
        }
    }
    this.cancel = async function (apiKey, id) {
        var result = await axios.get("https://chothuesimcode.com/api?act=expired&apik=" + apiKey + "&id=" + id)
        return result.data
    }
};

var SMS = function () {
    this.otpProvider = "";
    this.apiKey = "";
};
const otpSMS = new OtpSMS()
const ctsc = new Chothuesimcode()

SMS.prototype = {

    setStrategy: function (otpProvider) {
        if (otpProvider == 1) {
            this.otpProvider = otpSMS;
        } else {
            this.otpProvider = ctsc;
        }
    },
    setApiKey: function (apikey) {
        this.apiKey = apikey;
    },
    getInfo: function () {
        return this.otpProvider.getInfo(this.apiKey);
    },
    getPhone: function () {
        return this.otpProvider.getPhone(this.apiKey);
    },
    getCode: function (id) {
        return this.otpProvider.getCode(this.apiKey, id)
    },
    cancel: function (id) {
        return this.otpProvider.cancel(this.apiKey, id)
    }
};
module.exports = {
    OtpSMS: OtpSMS,
    Chothuesimcode: Chothuesimcode,
    SMS: SMS
};
