/**
 * Place your JS-code here.
 */

var gameRunning = false;
var playWithComputer = false;
var playVSOtherPlayer = false;
var otherPlayerName = '';
var websocket;
var myMarker = 'x';
var otherMarker = 'o';
var myTurn = false;
var finalDraw = false;

function addMessageBox(text){
            $('<div id="invitebox" class="invitebox"></div>').appendTo('body');
            $("#invitebox").addClass('invitearea');
            $("#invitebox").html(text + '</p>');
        }
        
window.Game = (function(){
    var canvas;
    var context;
    
    function computerMove(){
            for(var x=0;x<12;x++){
                for(var y=0;y<12;y++){
                    if(board[x][y] === undefined){
                        placeMarker(x, y, otherMarker);
                        myTurn = true;
                        $("#whichturn").text("Your turn");
                        return;
                    }
                }
            }
        }
          
    function otherPlayerMove(x,y){
        if(playVSOtherPlayer && (gameRunning || finalDraw)){
            var element = document.getElementById("name");
            var strUser = element.value;
            finalDraw = false;
            websocket.send('sendDraw|' + strUser + '|' + otherPlayerName + '|' + x + '|' + y);
            myTurn = false;
            $("#whichturn").text(otherPlayerName + " turn");
        } else if (gameRunning || finalDraw){
            finalDraw = false;
            setTimeout(function () {
                computerMove()
            }, 1000);
        }
    }
   
    var placeMarker = function(x, y, marker){
            if(board[x][y] === undefined) {
                board[x][y] = marker;
                drawMarker(x, y, marker);
                if(upWestDownRight(x, y, marker) ||
                    upRightDownWest(x, y, marker) ||
                    horizontal(x, y, marker)||
                    vertical(x, y, marker)){
                    gameRunning = false;
                    finalDraw = true;
                    $("#whichturn").text("");
                    if(marker === myMarker){
                    addMessageBox(' You win five-in-a-row!!!');
                    } else {
                        addMessageBox(' You Lost!!!');
                    }
                    $( "<button type=\"button\" id=\"closeDialog\">Ok</button>" ).appendTo( "#invitebox" ).click(function(f) {
                        $('#lightbox_overlay').remove();
                        $('#invitebox').remove(); 
                        });
                }
            } else {
                console.log('marker already placed');
            }
    }
       
    function upWestDownRight(x, y, myMarker) {
        var minX = x-4;
        var minY = y-4;
        var fiveInARow = false;
        var counter = 0;
            
        for(var i=0;i<9;i++) {
            var xPosition = minX+i;
            var yPosition = minY+i;
            
            if(xPosition>=0 && yPosition>=0 && xPosition<30 && yPosition<30) {
                if(myMarker === board[xPosition][yPosition]){
                    counter++;
                    if(counter>=5){
                        fiveInARow = true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
        return fiveInARow;
    }
    
    function upRightDownWest(x, y, myMarker) {
        var minX = x-4;
        var maxY = y+4;
        var fiveInARow = false;
        var counter = 0;
        
        for(var i=0;i<9;i++) {    
            var xPosition = minX+i;
            var yPosition = maxY-i;
            
            if(xPosition>=0 && yPosition>=0 && xPosition<30 && yPosition<30) {
                if(myMarker === board[xPosition][yPosition]){
                    counter++;
                    if(counter>=5){
                        fiveInARow = true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
        return fiveInARow;
    }
    
    function horizontal(x, y, myMarker) {
        var counter = 0;
        var minX = x-4;
        var fiveInARow = false;
        
        for(var i=0;i<9;i++) {
            var xPosition = minX+i;
            var yPosition = y;
            
            if(xPosition>=0 && xPosition<30) {
                if(myMarker === board[xPosition][yPosition]){
                    counter++;
                    if(counter>=5){
                        fiveInARow = true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
        return fiveInARow;
    }
    
    function vertical(x, y, myMarker) {
        var fiveInARow = false;
        var counter = 0;
        var minY = y-4;
        
        for(var i=0;i<9;i++) {    
            var xPosition = x;
            var yPosition = minY+i;
            
            if(yPosition>=0 && yPosition<30) {
                if(myMarker === board[xPosition][yPosition]){
                    counter++;
                    if(counter>=5){
                        fiveInARow = true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
        return fiveInARow;
    }

    function getClickPosition(ev) {
        if ((playWithComputer || playVSOtherPlayer) && myTurn && gameRunning){
            var x = ev.clientX - canvas.offsetLeft;
            var y = ev.clientY - canvas.offsetTop;
            if(x===0){
                x=x+1;
            }
            if(y===0){
                y=y+1;
            }
            var roundedX = Math.floor(x/25);
            var roundedY = Math.floor(y/25);
            if(board[roundedX][roundedY] === undefined){
                placeMarker(roundedX, roundedY, myMarker);
                myTurn = false;
                $("#whichturn").text(otherPlayerName + " turn");
                otherPlayerMove(roundedX, roundedY);
            }
        }
    }
    
    function drawHorizontalLines(width, numberOfLines){
        context.save();
        for (var i=0;i<numberOfLines;i++) {
        context.beginPath();
            context.moveTo(width,0);
            context.lineTo(width,300);
            context.strokeStyle = "Black";
            context.stroke();
            context.closePath();
            width = width + 25;
        }
        context.restore();
    }
    
    function drawVerticalLines(height, numberOfLines){
        context.save();
        for (var i=0;i<numberOfLines;i++) {
        context.beginPath();
            context.moveTo(0, height);
            context.lineTo(300, height);
            context.strokeStyle = "Black";
            context.stroke();
            context.closePath();
            height = height + 25;
        }
        context.restore();
    }
    
    function drawX(x, y){
        var column = 25*x;
        var row = 25*y;
        
        context.save();
        context.beginPath();
        context.strokeStyle = "Green";
        context.moveTo(column+4, row+4);
        context.lineTo(column+21, row+21);
        context.stroke();
        context.closePath();
        context.restore();
        context.save();
        context.beginPath();
        context.strokeStyle = "Green";
        context.moveTo(column+4, row+21);
        context.lineTo(column+21, row+4);
        context.stroke();
        context.closePath();
        context.restore();
    }
    
    function drawO(x,y){
        context.save();
        context.beginPath();
        context.strokeStyle = "Red";
        context.moveTo(x*25+22, y*25+12.5);
        context.arc(x*25+12.5, y*25+12.5, 9, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.restore();
    }
    
    function drawMarker(x, y, marker){
        if (marker === 'x'){
            drawX(x, y);
        }else if (marker === 'o'){
                drawO(x, y);
        }
    }
    
    function renderBoard(){
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        canvas.addEventListener('click', getClickPosition, false);
        context.save();
        
        drawHorizontalLines(25, 12);
        drawVerticalLines(25, 12);
        context.restore();
    }
    
    function create2Darray(size) {
        for (var i=0; i<size; i++) {
            board[i] = [];
        }
    }
  
    var startGame = function() {
        create2Darray(30);
        renderBoard();
    }
    
    return {'placeMarker': placeMarker, 'startGame':startGame}
})();

var board = [];

$(document).ready(function(){
    var url = document.getElementById('url'),
    connect = document.getElementById('connect'),
    disconnect = document.getElementById('disconnect');
    
    connect.addEventListener('click', function(event) {
        websocket = new WebSocket('ws://nodejs1.student.bth.se:8058');
      
        // Eventhandler when the websocket is opened.
        websocket.onopen = function() { 
            console.log('The websocket is now open.');
            $("#connectedinfo").text("Connected to server");
            $('#disconnect').removeAttr('disabled');
            $('#connect').attr('disabled', 'disabled');
            websocket.send('update:' + document.getElementById('name').value);
        }
      
        function unique(array) {
            return $.grep(array, function(el, index) {
                return index === $.inArray(el, array);
            });
        }

        function updateNames(nameArr){
            var element = document.getElementById("name");
            var strUser = element.value;
            var select = document.getElementById("myselect");
            document.getElementById("myselect").options.length = 0;
            for (var j=0; j<nameArr.length;j++){
                if (nameArr[j] != null && nameArr[j] !='' && nameArr[j] != strUser) {
                    selectElement = document.getElementById("myselect");
                    option = document.createElement("option");
                    option.text = nameArr[j];
                    selectElement.add(option, selectElement[0]); 
                }
            }    
            selectElement = document.getElementById("myselect");
            option = document.createElement("option");
            option.text = 'Computer';
            selectElement.add(option, selectElement[0]);
        }
        
        function addLightBoxOverlay(){
            $('<div id="lightbox_overlay"></div>')
                .css('opacity', '0')
                .animate({'opacity': '0.7'}, 'slow')
                .appendTo('body');
        }
        
        websocket.onmessage = function(event) {
            console.log('Receiving message: ' + event.data);
            var text = event.data;
            var data = event.data;
            var dataArr = data.split('|');
            var name = document.getElementById('name').value;
        
            if(text.indexOf('inviteDeny|') === 0){
                if(dataArr[2] === name){
                    addLightBoxOverlay();
                    addMessageBox(' Your game invite was denied');
                    $( "<button type=\"button\" id=\"inviteDenied\">Ok</button>" ).appendTo( "#invitebox" ).click(function(f) {
                        $('#lightbox_overlay').remove();
                        $('#invitebox').remove(); 
                    });
                }
            }
            
            if(text.indexOf('inviteAccepted|') === 0){
                if(dataArr[1] === name){
                    addLightBoxOverlay();
                    addMessageBox(' Your game invite was accepted');
                    $( "<button type=\"button\" id=\"inviteAcceptedOk\">Start playing</button>" ).appendTo( "#invitebox" ).click(function(f) {
                        $('#lightbox_overlay').remove();
                        $('#invitebox').remove();   
                        Game.startGame();
                        gameRunning = true;
                        playWithComputer = false;
                        playVSOtherPlayer = true;
                        otherPlayerName = dataArr[2];
                        myMarker = 'x';
                        otherMarker = 'o';
                        myTurn = true;
                        $("#whichturn").text("Your turn");
                        $("#gameInfo").text("You are playing with " + otherPlayerName);
                    });
                }
            }
            
            if(text.indexOf('draw|') === 0){
                if(name === dataArr[1]) {
                    Game.placeMarker(dataArr[3],dataArr[4], otherMarker);
                    myTurn = true;
                    $("#whichturn").text("Your turn");
                }
            }
            
            if(text.indexOf('inviteFailAlreadyPlaying|') === 0){
                if(dataArr[2] === name){
                    addLightBoxOverlay();
                    addMessageBox(' ' + dataArr[1] + ' is already playing.');
                        $( "<button type=\"button\" id=\"inviteAccept\">accept</button>" ).appendTo( "#invitebox" ).click(function(f) {
                            $('#lightbox_overlay').remove();
                            $('#invitebox').remove();      
                            });
                }
            }
                
            if(text.indexOf('invitefrom') === 0){
                if(dataArr[2] === name){
                    if(gameRunning) {
                        websocket.send('inviteFailAlreadyPlaying|' + dataArr[1] + '|' + name);
                    }else{
                        addLightBoxOverlay();
                        addMessageBox(' You have got an invite from ' + dataArr[1]);
   
                        $( "<button type=\"button\" id=\"inviteAccept\">accept</button>" ).appendTo( "#invitebox" ).click(function(f) {
                            $('#lightbox_overlay').remove();
                            $('#invitebox').remove();                       
                            f.stopPropagation();             
                            websocket.send('inviteAccept|' + dataArr[1] + '|' + name);
                            gameRunning = true;
                            playWithComputer = false;
                            playVSOtherPlayer = true;
                            otherPlayerName = dataArr[1];
                            myMarker = 'o';
                            otherMarker = 'x';
                            Game.startGame();
                            $("#gameInfo").text("You are playing with " + otherPlayerName);
                        });
                    }
                    
                    $( "<button type=\"button\" id=\"inviteDeny\">deny</button>" ).insertAfter( "#inviteAccept" ).click(function(f) {
                        f.stopPropagation();
                        $('#lightbox_overlay').remove();
                        $('#invitebox').remove(); 
                        websocket.send('inviteDeny|' + name + '|' + dataArr[1]);
                    });
                }
            }
        
            else if (text.indexOf('update:') === 0){
                var nameStr = text.substring(7); 
                var nameArr = nameStr.split(",");
                nameArr = unique(nameArr);
                updateNames(nameArr);
            } 
        }
     
        // Eventhandler when the websocket is closed.
        websocket.onclose = function() {
            $('#disonnect').attr('disabled', 'disabled');
            $('#connect').removeAttr('disabled', 'disabled');
            $("#connectedinfo").text("");
            console.log('The websocket is now closed.');
        }
    } , false);
    
    disconnect.addEventListener('click', function(event) {
      if(!websocket || websocket.readyState === 3) {
        console.log('The websocket is not connected to a server.');
      } else {
        $('#disconnect').attr('disabled', 'disabled');
        $('#connect').removeAttr('disabled', 'disabled');
        $("#connectedinfo").text("");
        websocket.close();
        }
    });  
    
    var invite = document.getElementById('invite');
        invite.addEventListener('click', function(event) {
        var name = document.getElementById('name').value;
        var element = document.getElementById("myselect");
        if (element.options[element.selectedIndex].text === 'Computer'){
            Game.startGame();
            gameRunning = true;
            playWithComputer = true;
            playVSOtherPlayer = false;
            otherPlayerName = 'Computer';
            myMarker = 'x';
            otherMarker = 'o';
            myTurn = true;
            $("#whichturn").text("Your turn");
            $("#gameInfo").text("You are playing with " + otherPlayerName);
        }else {
            var strUser = element.options[element.selectedIndex].text;
            $("#gameInfo").text('Awaiting invite answer from ' + strUser);
            websocket.send('invite|' + name + '|' + strUser);
        }
    });

    function create2Darray(size) {
        for (var i=0; i<size; i++) {
            board[i] = [];
        }
    }
    
     $('#name').keyup(function() {
        if ($(this).val() == '') {
            $('#connect').attr('disabled', 'disabled');
        }else {
            $('#connect').removeAttr('disabled');
        }
        console.log("Keyup");
     });
    
    create2Darray(30);
    Game.startGame();
});

