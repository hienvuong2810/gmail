const io = require("socket.io-client")
var sio =  {
    socket: null,
    init: function() {
        console.log('1')
        this.socket = io("http://localhost:6969")
    },
    getA: function (){
        return new Promise((resolve, reject) => {
            this.socket.emit('a')
            this.socket.on('a', function(data){
                resolve(data)
            }) 
        })
    },
}
module.exports = {
    sio: sio
}
