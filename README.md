# fiveinarow

To download/clone the code use</br>
```git clone https://github.com/jonssonmarcus/fiveinarow.git```

To get this code running you need node.js, look at 
[node.js](https://nodejs.org/) for instructions of how to install it.

The game is also using websockets. Websockets is not included
in node.js, so you have to install that module.
The game is only tested with websocket version 1.0.3.
I used this implementation of [websocket](https://github.com/Worlize/WebSocket-Node)

To install websocket you should navigate in your console to the place where you 
cloned the repository for the game and then type:

```%npm install websocket@1.0.3```  </br>
```npm http GET https://registry.npmjs.org/websocket/1.0.3```  </br>
```npm http 304 https://registry.npmjs.org/websocket/1.0.3```  </br>
```websocket@1.0.3 node_modules/websocket```  </br>
_Percentage sign should not be typed, it's representing the prompt._ </br>

To start the webserver, navigate into the directory fiveinarow and then type<br/>
```node gameserver.js```

Open ```http://yourhost/fiveinarow/``` in your browser to start playing. You need to use a 
browser that has javascript enabled.

