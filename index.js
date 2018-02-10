// Add in socket.io and express
var io = require('socket.io')
var express = require('express')

// Deal with event emitting
var events = require('events'),
var serverEmitter = new events.EventEmitter()

// Start up express server
var app = express()
var server = require('http').createServer(app)

// Link up socket io to listen through the http server
io = io.listen(server)

// Listen with the http server
server.listen(4000)

// Now let's set up and start listening for events
io.sockets.on('connection', function(socket) {
    serverEmitter.on('message', function (message) {
      // Send Message
      socket.emit('message', {type: 'success', content: message })
    })

})

// Read information from the terminal line and send it through socket.io to the client
var readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout)
rl.setPrompt('message > ')
rl.prompt()
rl.on('line', function(line) {
    if (line === "exit") {
      rl.close()
    }

    // We use the server emiter here to emit up to the serverEmitter.on within the socket.io connection
    serverEmitter.emit('message', line)

    rl.prompt()
}).on('close',function(){
    process.exit(0)
})

