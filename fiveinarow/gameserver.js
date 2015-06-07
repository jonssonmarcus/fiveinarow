var port = 8058;

// Require the modules we need
var http = require('http');

// Create a http server with a callback handling all requests
var httpServer = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Hello world\n');
});

// Setup the http-server to listen to a port
httpServer.listen(port, function() {
  console.log((new Date()) + ' HTTP server is listening on port ' + port);
});

// Require the modules we need
var WebSocketServer = require('/home/saxon/students/20151/majd15/www/node/node_modules/websocket').server;

// Create an object for the websocket
// https://github.com/Worlize/WebSocket-Node/wiki/Documentation
wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false
});

var connections = [];
var nameMap = {};
var names = "update:";
wsServer.on('request', function(request) {
    var connection;
    connection = request.accept();
    var index = connections.length;
    console.log((new Date()) + ' Connection accepted from ' + request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            var messageArr = message.utf8Data.split('|');
          
            if (message.utf8Data.indexOf('invite|') === 0){
                console.log('invite from' + messageArr[1] + ' to ' + messageArr[2]);
            
                for(var i=0;i < connections.length; i++){
                    if (connections[i] != null){
                        if(nameMap[messageArr[2]] == connections[i].remoteAddress){
                            connections[i].sendUTF('invitefrom|' + messageArr[1] + '|'+ messageArr[2]);
                        }
                    }
                }
            } else if(message.utf8Data.indexOf('sendDraw|') === 0){
                    for(var i=0;i < connections.length; i++){
                        if (connections[i] != null){
                            if(nameMap[messageArr[2]] == connections[i].remoteAddress){
                                connections[i].sendUTF('draw|' + messageArr[2] + '|' + messageArr[1] + '|' + messageArr[3] + '|' + messageArr[4]);
                            }
                        }              
                    }
            } else if(message.utf8Data.indexOf('inviteFailAlreadyPlaying|') === 0){
                    for(var i=0;i < connections.length; i++){
                        if (connections[i] != null){
                            if(nameMap[messageArr[2]] == connections[i].remoteAddress){
                                connections[i].sendUTF('inviteFailAlreadyPlaying|' + messageArr[2] + '|' + messageArr[1]);
                            }
                        }   
                    }
            } else if(message.utf8Data.indexOf('inviteAccept|') === 0){
                    var inviteArr = message.utf8Data.split('|');
                    for(var i=0;i < connections.length; i++){
                        if (connections[i] != null){
                            if(nameMap[inviteArr[1]] == connections[i].remoteAddress){
                                console.log('invite accepted from ' + inviteArr[1] +' to ' + inviteArr[2])
                                connections[i].sendUTF('inviteAccepted|' + inviteArr[1] + '|' + inviteArr[2]);
                            }
                        }
                    }
            }  else if(message.utf8Data.indexOf('inviteDeny|') === 0){
                    var inviteArr = message.utf8Data.split('|');
                    for(var i=0;i < connections.length; i++){
                        if (connections[i] != null){
                            if(nameMap[inviteArr[1]] == connections[i].remoteAddress){
                                console.log('invite denied from ' + inviteArr[1] +' to ' + inviteArr[2])
                                connections[i].sendUTF('inviteDeny|' + inviteArr[1] + '|' + inviteArr[2]);
                            }
                        }
                    }
            }
            else if (message.utf8Data.indexOf('update:') === 0){
                name = message.utf8Data.substring(7);
                connection.name = name;
                nameMap[name] = connection.remoteAddress;
                names += ',' + name;
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i] != null){
                        connections[i].sendUTF(names);
                    }
                }
                connection.sendUTF(names);
            }
      }
      
  });
  
  // Callback when client closes the connection
  connection.on('close', function(reasonCode, description) {
      var nameToRemove = connection.name;
      names = names.replace(nameToRemove,"");
      for (var i = 0; i < connections.length; i++) {
        if (connections[i] != null){
            connections[i].sendUTF(names);
        }
    }
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
      connections[index] = null;
  });
  connections.push(connection);
});