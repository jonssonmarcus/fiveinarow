<?php $title='Template for testprogram'; include(__DIR__ . '/../../header.php'); ?>
<div id="body">
<div>
<canvas id='canvas' width='300' height='300'>
  Your browser does not support the element HTML5 Canvas.
</canvas>
<div id="gametitle">Five in a row</div>
<div id="gamerules">Welcome to play five in a row. To play against the computer you select 
                    computer in the drop down box and press invite. To play against another
                    player you have to enter your name and then connect to the server. Then 
                    it's just to invite the player you want to beat!
                    The rules are simple, the first one that gets five markers in a row win!</div>
<div id="gameInfo">You are playing with </div>
<div id="whichturn"></div>
<div id="playVsOtherPlayer">
<div id="connectedinfo"></div>
Your Name: <input id='name'/> 
<button type="button" id="connect" disabled="disabled">Connect to server</button>
<button type="button" id="disconnect" disabled="disabled">Close connection</button>
<select id='myselect'>
<option value="computer">Computer</option>
</select> 
<button type="button" id="invite">Invite player</button>
</div>
<div id="loginArea"><div>
</body>

<?php $path=__DIR__; include(__DIR__ . '/footer.php'); ?>