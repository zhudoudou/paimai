var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('dist/index.html');
});

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 3001 });
var goods = [{"id":0,"price":100}];

function loadMysql(){
    return goods;
}
function updateMysql(id,price){
    var temp={"id":id,"price":price};
    goods.push(temp);
}
wss.on('connection', function (ws) {
    console.log('client connected');
    setInterval(function(){
	if(ws.readyState === 1){
    	ws.send(JSON.stringify(loadMysql()));
        }
    },1000);
    ws.on('message', function (message) {
        // if(message === 'giveMePrice'){
        //    ws.send(String(price)); 
        // }
        var data = JSON.parse(message);
        updateMysql(data.id, data.price);
    });
});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});