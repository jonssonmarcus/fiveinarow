<?php $title='Template for testprogram'; include(__DIR__ . '/../../header.php'); ?>
<div id="body">
<div id="title">Five in a row</div>
<p/>
<div id="fiarimg"> <a href="http://www.student.bth.se/~majd15/kmom0710/fiveinarow/"><img src="fiveinarow.png" height="200" width="550" /></a></div>
<p/>
<div id="productinfo">Five in a row är ett väldigt underhållande spel som ibland
benämns som luffarchack. Spelet är ett strategispel som går ut på att man ska försöka få 
5 av sina egna markörer i en linje. Linjen får vara vågrät, lodrät eller diagonal. Den som 
först får 5 markörer i rad vinner. Man kan välja att spela mot datorn eller så
bjuder man in någon som är inloggad på spelservern. Den här versionen av 5-i-rad är helt
reklamfri och då den är byggd med den senaste tekniken så behöver man aldrig uppdatera
sin webbläsare för att se om det är någon som har loggat in eller ut från servern eller
om någon har skickat en spelinbjudan.</div>
</p>
<div id="compare">
Det finns flera versioner av five-in-a-row på nätet.<br/>
<a href="http://www.javascripter.net/games/xo/xo.htm">http://www.javascripter.net/games/xo/xo.htm</a> är en 
av dem. Denna versionen erbjuder bara möjligheten att spela mot datorn jämfört med min version där man kan spela mot
antingen datorn eller sina vänner. Den har också en del reklam på sidan, vilket min version inte har. 
Det som jag tycker är bra med deras version är att det finns möjligheten att ställa in hur många rutor man vill ha i sitt spel, det kan 
man tyvärr inte ännu i min version.<br/><br/>

En annan version jag tittade på är <a href="http://www.novelgames.com/en/mpgames/fiveinarow/">http://www.novelgames.com/en/mpgames/fiveinarow/</a>
Här finns möjligheten att utmana sina vänner. Dock så behöver man logga in för att göra så. I min version så behöver man bara skriva
in sitt namn för att spela mot datorn eller sina vänner. Sidan tycker jag ser väldigt
rörig ut och det är väldigt mycket reklam. Man kan inte börja ett nytt spel heller förräns man har tittat på en reklam-video.
Spelet verkar vara gjort med flash och tar rätt så lång tid att ladda. Det som är positivt med denna versionen är att 
det finns möjlighet att tipsa om spelet på facebook och liknande. Man kan även dela sitt spelresultat på facebook. Att kunna tipsa
om spelet på facebook har inte min version, men det kan nog vara bra att ha den möjligheten om man vill få bättre spridning 
på spelet.
<br/><br/>

Jag tittade även på <a href="http://www.gomoku.se/#">http://www.gomoku.se/#</a> Denna versionen är enkel i sin design utan reklam.
Tyvärr så kan man bara spela mot datorn i denna versionen. Något denna versionen har som inte jag har är möjligheten att få
tips var man bör placera sin markör. Det finns också möjligheten att byta bakgrund, den möjligheten finns inte i mitt spel än.
<br/><br/>

Det som står på listan att förbättra i mitt spel är:<br/>
&bull; Möjlighet att ställa in antal rutor för spelbordet.<br/>
&bull; Lägga till möjligheten att dela sitt resultat på facebook.<br/>
&bull; Lägga till möjligheten att byta bakgrund på spelbordet.<br/>
&bull; Göra det möjligt att chatta med personen man möter.<br/>
&bull; Göra spelet mot datorn mer utmanande.<br/>

</div>
<p/>
<div id="github">
För att installera programkoden och köra den så behöver man först hämta koden från github.<br/>
<code>git clone https://github.com/jonssonmarcus/fiveinarow.git</code><p>

Spelet använder sig av node.js. Gå till <a href="https://nodejs.org/">node.js</a> för instruktioner
om hur du installerar det.

Spelet använder sig också av websockets. Websockets finns inte med i node.js, så man måste själv installera
websockets-modulen. Spelet är testat med denna implementationen av <a href="https://github.com/Worlize/WebSocket-Node">websocket</a>,version 1.0.3

När du installerar websocket så ska du i din konsol navigera till den platsen där du klonade spelet. Sedan så
skriver du följande:<br/>

<code>%npm install websocket@1.0.3</code></br>
<code>npm http GET https://registry.npmjs.org/websocket/1.0.3</code></br>
<code>npm http 304 https://registry.npmjs.org/websocket/1.0.3</code></br>
<code>websocket@1.0.3 node_modules/websocket</code></br>
Procent-tecknet representerar prompten och ska inte skrivas i konsollen.<br/><br/>

Man behöver ändra i ett par filer. <br/>
I <code>gameserver.js</code> så ändrar man <br/>
<code>var port = 8058;</code><br/> till den port man själv tänker använda.<br/>

I <code>main.js</code> så letar man upp raden <br/>
<code>websocket = new WebSocket('ws://nodejs1.student.bth.se:8058');</code> <br/> 
och ändrar url:en till sin egna server och port. <br/><br/>

För att starta webservern så navigerar du in i katalogen fiveinarow och skriver sedan
<code>node gameserver.js</code>

Öppna sedan en webbläsare som stödjer javascript och gå till <code>http://din server/fiveinarow/</code> för att starta spelet.
<br/>
Programkoden för spelet finns på 
<a href="https://github.com/jonssonmarcus/fiveinarow">Github</a>.
</div>
<p/>

<div id="tothegame">
<a href="http://www.student.bth.se/~majd15/kmom0710/fiveinarow/">Till spelet</a>
</div>
</body>

<?php $path=__DIR__; ?>