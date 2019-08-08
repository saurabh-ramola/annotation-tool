var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs');

app.get('/', function(req,res) {
	var files = fs.readdirSync('./files');
	console.log(files);
	res.render('file',{data : files});
});

app.post('/',  urlencodedParser,function(req,res) {
	console.log(req.body);

	res.redirect('/profiles?file=' + req.body.file_name);
});

app.post('/newPage', urlencodedParser,function(req,res){
	var data = fs.readFileSync(__dirname + '/files/'+req.body.file_name,'utf-8');
	data = data.split("\n");
	for(var key in req.body)
	{
		data[parseInt(key)] = data[parseInt(key)] + ' | ' + req.body[key];
	}
	fs.writeFileSync(__dirname+'/annotatedFiles/'+req.body.file_name,data.join("\n"));
	res.redirect('/');
})


app.get('/profiles',function(req,res) {
	var text = fs.readFileSync(__dirname+'/files/'+req.query.file,'utf-8');
	
	res.render('profiles',{data : text.split("\n"), name : req.query.file});
})


app.listen(3000);