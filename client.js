dgram = require('dgram');
config = require('./config.json');

for (let i = 0; i < process.argv.length; i++) {
    console.log(i + ' -> ' + (process.argv[i]));
}

let udpClient = dgram.createSocket('udp4');
const HOST = config.host;
const PORT = config.port;

sendUdpMessage(process.argv[2]);

udpClient.on('message', function(message, remote){

	console.log("Response from " + remote.address + ':' + remote.port +' - ' + message);
	let messageStr = message.toString();

	process.exit(0);

});


function sendUdpMessage(_messageString){

	let updHeader = new Buffer([0,7]);
	let updCommand = new Buffer(_messageString); 
	let udpCR = new Buffer ( [13] );

	let length = updHeader.length + updCommand.length + udpCR.length;
	console.log("Buffer Length: " + length);
	udpMessage = Buffer.concat([updHeader, updCommand, udpCR], length);

	console.log(udpMessage);

	udpClient.send(udpMessage, 0, udpMessage.length, PORT, HOST, function(err, bytes){
		if (err) throw err;
	})
}