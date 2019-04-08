
'user strict';

var mysql = require('mysql');



var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456789",
    database: "ppc_db",
    multipleStatements: true
    // host: "192.168.1.20",
    // port: "3306",
    // user: "remote", //root
    // password: "Caml1nfort@2020#",
    // database: "ppc_db",
    // multipleStatements: true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected successfully!");
  });

  module.exports = con;