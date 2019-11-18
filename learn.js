var http= require('http'); 


var server=http.createServer(function(req,res){ 
    //send a reponsive back to client, this is the responsive header// 
res.writeHead(200,{'Content-Type': 'text/plain'}) 
res.end ('hey wissem'); // n9dro nremplaciw by text/html

}); 
server.listen(3001,'127.0.0.1');  
console.log('okay'); 

