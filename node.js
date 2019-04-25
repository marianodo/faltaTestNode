var mysql = require('mysql');
var nodemailer = require('nodemailer');

var con = mysql.createConnection({
  host: "integralcom.dyndns.org",
  user: "neptunodb",
  password: "diamante",
  port :3010,
  database:"neptunodb"
});

var date = new Date();

var mainDate = date.getFullYear() + ("0" + (date.getMonth()+1)).slice(-2) + ("0" + date.getDate()).slice(-2) 
var strDate1 = mainDate + '000000';
var strDate2 = mainDate + '235959';
console.log(strDate1)

con.connect(function(err) {
  if (err) throw err;
  var query = "SELECT cod_cuenta FROM log_eventos WHERE evento = 'FALTA DE TEST' AND log_eventos.datetime > " + strDate1 + " AND log_eventos.datetime < " + strDate2 ;
  var data = "";
  con.query(query, function (err, result) {
    if (err) throw err;
    

    result.forEach(function(value){
    data = data + "\n" + value["cod_cuenta"];
		});
    var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'mardom4164@gmail.com',
	    pass: 'iwssmtaohxewuslo'
	  }
	});

	var mailOptions = {
	  from: 'mardom4164@gmail.com',
	  to: 'integralcomobil@gmail.com',
	  subject: 'El mejor de tus hijos!',
	  text: data
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	  }
	  process.exit();
});
  });
});
