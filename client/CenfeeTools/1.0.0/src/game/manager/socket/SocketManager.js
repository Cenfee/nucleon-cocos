/**
 * Created by baoli on 2015/3/6.
 */
puremvc.declare("game.manager.socket.SocketManager", cc.Class.extend({


    connect:function()
    {
        //create a client by using this static method, url does not need to contain the protocol
        var sioclient = SocketIO.connect("192.168.1.155:8002", {"force new connection" : true});

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        sioclient.tag = "Test Client";

        //attaching the status label to the socketio client
        //this is only necessary in javascript due to scope within shared event handlers,
        //as 'this' will refer to the socketio client
        sioclient.statusLabel = this._sioClientStatus;

        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function()
        {
            var msg = sioclient.tag + " Connected!";
            cc.log(msg);
            sioclient.send(msg);
        });

        //example of a handler that is shared between multiple clients
        sioclient.on("message", function(data) {
            var msg = this.tag + " received message: " + data;
            cc.log(msg);
        });

        sioclient.on("echotest", function(data)
        {
            cc.log("echotest 'on' callback fired!");
            var msg = this.tag + " says 'echotest' with data: " + data;
            cc.log(msg);
        });

        sioclient.on("testevent", function(data) {
            var msg = this.tag + " says 'testevent' with data: " + data;
            cc.log(msg);
        });

        sioclient.on("disconnect", function() {
            var msg = this.tag + " disconnected!";
            cc.log(msg);
        });

    },

    connectWebSocket:function()
    {
        this._wsiSendBinary = new WebSocket("ws://echo.websocket.org");
        this._wsiSendBinary.binaryType = "arraybuffer";
        this._wsiSendBinary.onopen = function(evt)
        {
            cc.log("Send Binary WS was opened.");
        };

        this._wsiSendBinary.onmessage = function(evt)
        {
            self._sendBinaryTimes++;
            var binary = new Uint16Array(evt.data);
            var binaryStr = "response bin msg: ";

            var str = "";
            for (var i = 0; i < binary.length; i++)
            {
                if (binary[i] == 0)
                {
                    str += "\'\\0\'";
                }
                else
                {
                    var hexChar = "0x" + binary[i].toString("16").toUpperCase();
                    str += String.fromCharCode(hexChar);
                }
            }

            binaryStr += str + ", " + self._sendBinaryTimes;
            cc.log(binaryStr);
        };

        this._wsiSendBinary.onerror = function(evt)
        {
            cc.log("sendBinary Error was fired");
        };

        this._wsiSendBinary.onclose = function(evt)
        {
            cc.log("_wsiSendBinary websocket instance closed.");
        };
    }
}));

game.manager.socket.SocketManager._instance;
game.manager.socket.SocketManager.getInstance = function()
{
    if(!game.manager.socket.SocketManager._instance)
    {
        game.manager.socket.SocketManager._instance = new game.manager.socket.SocketManager();
    }
    return game.manager.socket.SocketManager._instance;
}