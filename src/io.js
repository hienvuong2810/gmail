const io = require("socket.io-client")
var sio =  {
    socket: null,
    SID: "1",
    init: () => {
        // 
        return new Promise((resolve, reject) => {
            // this.socket = io("https://www.toolmailmmo.com")
            this.socket = io("http://localhost:6969")
            this.socket.on('connect', () => {
               this.SID = this.socket.id
               resolve()
            })
        })
    },
    getA: () => {
        return new Promise((resolve, reject) => {
            this.socket.emit('a')
            this.socket.on('a', function(data){
                resolve(data)
            }) 
        })
    },
    getB: () => {
        return new Promise((resolve, reject) => {
            this.socket.emit('b')
            this.socket.on('b', function(data){
                resolve(data)
            }) 
        })
    },
    getC: () => {
        return new Promise((resolve, reject) => {
            this.socket.emit('c')
            this.socket.on('c', function(data){
                resolve(data)
            }) 
        })
    },
    getD: () => {
        return new Promise((resolve, reject) => {
            this.socket.emit('d')
            this.socket.on('d', function(data){
                resolve(data)
            }) 
        })
    },
    getSID: () => {
        return this.SID
    },
    key: (encr) => {
        return new Promise((resolve, reject) => {
            this.socket.emit('k', encr)
            this.socket.on('k', function(data){
                resolve(data)
            }) 
        })
    },
    getKey: (key) => {
        return new Promise((resolve, reject) => {
            this.socket.emit('gk', key)
            this.socket.on('gk', function(data){
                resolve(data)
            }) 
        })
    }
}
module.exports = {
    sio: sio
}
