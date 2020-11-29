const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//connect mysql
let connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'join_us'
});



app.get("/", (req, res)=>{

const que = 'select count(*) as count from users';
const result_que = connection.query(que, (error, result, fields) => {
	if (error) throw error;
	
	//console.log(result);
	showResult(result);			
});
	
function showResult(result){
		
		console.log(result);
		//res.send('We have ' + result[0].count + ' users');
		let count = result[0].count;
	
	
		res.render('home', {count: count});
	}
	
	
	
	console.log('we have a request to response');
});


app.post("/register", (req, res) =>{
	
	let person = {
		email: req.body.email	
	};
	
 connection.query('insert into users set ?', person, (err, result, field)=> {
				  if (err) throw err;
	 			console.log(result);
				  });
	//console.log(req.body);
	//res.send('we have a new register' + req.body.email);
	res.redirect("/");
});





app.get("/joke", (req, res)=>{
	const joke = 'you youreself a big jokke';
	res.send(joke);
});

app.listen(3000, ()=>{
	console.log('server is running on port 3000');
});

