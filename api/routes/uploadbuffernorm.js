const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');

const multer = require('multer');
var fs = require('fs');
var dest=__dirname + '/uploads';

/** API path that will upload the files  of BufferNorm*/
router.post('/upload/BufferNorm', function(req, res) {
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb) {
                cb(null, dest);
            },
            filename: function (req, file, cb) {
            //console.log(file);
            console.log(file.fieldname);
            
                var datetimestamp = Date.now();
                //console.log(datetimestamp);
                cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
            }
        });
        var upload = multer({ //multer settings
            storage: storage
        }).single('file');


    // console.log(req.file);
     upload(req,res,function(err){
       console.log(req);
         if(err){
             // res.json({error_code:1,err_desc:err});
              return;
              
         }
          //res.json({error_code:0,err_desc:null});
          
        console.log(req.file.path);
       var xlsx = require('node-xlsx');
       var fs = require('fs');
     //  var obj = xlsx.parse(__dirname + '/uploads/CategoryMaster.xlsx'); // parses a file
     var obj = xlsx.parse(req.file.path); // parses a file
       var rows = [];
       var writeStr = "";
   
       //looping through all datarow
       for(var i = 0; i < obj.length; i++)
       {
           var dataRow = obj[i];
           //loop through all rows in the sheet
           for(var j = 0; j < dataRow['data'].length; j++)
           {
                   //add the row to the rows array
                   rows.push(dataRow['data'][j]);
           }
       }
   
       //creates the csv string to write it to a file
       for(var i = 0; i < rows.length; i++)
       {
           writeStr = writeStr + rows[i].join(",") + "\n";
       }
   
       //writes to a file, but you will presumably send the csv as a      
       //response instead
       fs.writeFile(__dirname + "/csvfileupload/BufferNormMaster.csv", writeStr, function(err) {
           if(err) {
               return console.log(err);
           }
           console.log("BufferNormMaster.csv was saved in the current directory!");
       });

       //after upload delete all files from uploads folder
       try{
        var delfiles = fs.readdirSync(__dirname + '/uploads');
       }catch(e){
           return;
       }
       
       if (delfiles.length > 0){
        for (var i = 0; i < delfiles.length; i++) {
         
            //console.log(delfiles[i]);
            if (fs.existsSync(__dirname + '/uploads/'+delfiles[i])) {
                console.log(__dirname + '/uploads/'+delfiles[i]);//check file exist
                                  
                  fs.unlink(__dirname + '/uploads/'+delfiles[i], function(error) {//delete file
                    if (error) {
                        throw error;
                    }
                    console.log('all file Deleted');
                   
                  });
              }
          }
        
       }
   
   });

   
   var csvParser = require('csv-parse');
   var filePath = __dirname + "/csvfileupload/BufferNormMaster.csv";

   fs.readFile(filePath, {
       encoding: 'utf-8'
     }, function(err, csvData) {
       if (err) {
         console.log(err);
       }
 
       csvParser(csvData, {
         delimiter: ','
       }, function(err, data) {
         if (err) {
           console.log(err);
         } else {
         //console.log(data);
               
         }
       });
     });
     const csvFilePath=filePath // Resource.csv in your case
     const csv=require('csvtojson') //. Make sure you have this line in order to call functions from this modules
     csv()
     .fromFile(csvFilePath)
     .then((jsonObj)=>{
         console.log(jsonObj);
         /**
          * [
          *  {a:"1", b:"2", c:"3"},
          *  {a:"4", b:"5". c:"6"}
          * ]
          */ 
         var counter = 0;
         for(var k=0;k<jsonObj.length;k++){

            var SKuCode=jsonObj[k].SKUCode;
            var NodeCode=jsonObj[k].NodeCode;
            var BufferNorm=jsonObj[k].BufferNorm;
            //var EffectiveFrom=jsonObj[k].EffectiveFrom;
            var Remarks=jsonObj[k].Remarks;
            var UpdatedBy=jsonObj[k].UpdatedBy;
            var year=jsonObj[k].year;
            var Q1BufferNorm=jsonObj[k].Q1BufferNorm;
            var Q2BufferNorm=jsonObj[k].Q2BufferNorm;
            var Q3BufferNorm=json[k].Q3BufferNorm;
            var Q4BufferNorm=json[k].Q4BufferNorm;
            var Q5BufferNorm=json[k].Q5BufferNorm;
            var fname='BufferNormMaster.csv';
            var ErrStatus=0;
          
           if (SKuCode==null && NodeCode==null && BufferNorm==null){
            ErrStatus=1;
           }
           if(isNaN(BufferNorm)){
            ErrStatus=1;
           }
           console.log(ErrStatus);
           var mysqlvar="SET @SKuCode = ?;SET @NodeCode = ?;SET @BufferNorm = ?;SET @Remarks = ?;SET @UpdatedBy = ?;SET @fname = ?;SET @ErrStatus =?;SET @year=?;SET @Q1BufferNorm=?;SET @Q2BufferNorm=?;SET @Q3BufferNorm=?;SET @Q4BufferNorm=?;SET @Q5BufferNorm=?; \
           CALL UploadBuffer_procedure(@SKuCode,@NodeCode,@BufferNorm,@Remarks,@UpdatedBy,@fname,@ErrStatus,@year,@Q1BufferNorm,@Q2BufferNorm,@Q3BufferNorm,@Q4BufferNorm,@Q5BufferNorm);";
            mysql.query(mysqlvar,[SKuCode,NodeCode,BufferNorm,Remarks,UpdatedBy,fname,ErrStatus,year,Q1BufferNorm,Q2BufferNorm,Q3BufferNorm,Q4BufferNorm,Q5BufferNorm], (err,rows) =>{
                if(!err){
                
                  // console.log(Object.values(JSON.parse(JSON.stringify(rows))));
                  // var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
                  //           //  resultArray.forEach(element => {
                  //           //         if(element.constructor==Array){                                
                                        
                  //           //             if(element[0].stageId=0){
                  //           //               console.log(element[0].stageId);
                  //           //             }
                  //           //         }
                  //           //     });
                  //           console.log(resultArray);
                  if(counter == jsonObj.length - 1) {                       
                    res.json({error_code:0,err_desc:null});
                }
               // console.log(jsonObj.length);
                counter++;
                }else{
                    console.log(err);
                }
              });
          
              
        
         }
 
     });

    


});
       




module.exports = router;