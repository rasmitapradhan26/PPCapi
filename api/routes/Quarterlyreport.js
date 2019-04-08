const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');


//Get all active rawmaterial 
router.get('/', (req,res,next) => {
  var now = new Date();
  var monthid = now.getMonth() + 1;
  console.log("Current month is: " + monthid);
  var currentYear = now.getFullYear()
  console.log("Current year is: " + currentYear);
console.log(monthid,currentYear);
  var mysqlvar="SET @monthid = ?;SET @currentYear = ?; \
                CALL simulaterquarterly_procedure(@monthid,@currentYear);";
               
    //var mysqlvar="CALL simulaterquarterly_procedure();";
    mysql.query(mysqlvar,[monthid,currentYear], (err,rows,fields) =>{
      if(!err){
          //console.log(Object.values(JSON.parse(JSON.stringify(rows))));
          res.send(Object.values(JSON.parse(JSON.stringify(rows[2]))));
           
        }else{
            console.log(err);
        }
      
   });

});
//Get all active rawmaterial 
router.get('/MonthlyReport/', (req,res,next) => {
  var now = new Date();
  var monthid = now.getMonth() + 1;
  console.log("Current month is: " + monthid);
  var currentYear = now.getFullYear()
  console.log("Current year is: " + currentYear);
  console.log(monthid,currentYear);
  var mysqlvar="SET @monthid = ?;SET @currentYear = ?; \
                CALL MonthleReport_procedure(@monthid,@currentYear);";
               
    //var mysqlvar="CALL simulaterquarterly_procedure();";
    mysql.query(mysqlvar,[monthid,currentYear], (err,rows,fields) =>{
      if(!err){
          //console.log(Object.values(JSON.parse(JSON.stringify(rows))));
          res.send(Object.values(JSON.parse(JSON.stringify(rows[2]))));
           
        }else{
            console.log(err);
        }
      
   });

});


module.exports = router;