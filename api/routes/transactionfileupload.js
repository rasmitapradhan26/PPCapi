const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');

const multer = require('multer');
var fs = require('fs');
var dest=__dirname + '/uploads';

/** API path that will upload the files  of SKUmaster*/
router.post('/upload/Transactionfile', function(req, res) {
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
         // res.json({error_code:0,err_desc:null});
          
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
       fs.writeFile(__dirname + "/csvfileupload/TransactionFile.csv", writeStr, function(err) {
           if(err) {
               return console.log(err);
           }
           console.log("TransactionFile.csv was saved in the current directory!");
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
   var filePath = __dirname + "/csvfileupload/TransactionFile.csv";

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
         var transformation = [];
         var counter = 0;
         for(var k=0;k<jsonObj.length;k++){

          const json2csv = require('json2csv').parse;
          var json = jsonObj[k];
          
           var TransactionDate=jsonObj[k].Transaction_Date;
           var SKUCode=jsonObj[k].SKU;
           var NodeCode=jsonObj[k].NodeCode;
           var ReciptQty=jsonObj[k].ReciptQty;
           var SalesQTY=jsonObj[k].SalesQTY;
           var SalesReturn=jsonObj[k].SalesReturn;
           var ClosingQty=jsonObj[k].ClosingQty;
           var InTransit=jsonObj[k].InTransit;
           var TradingitemInTransit=jsonObj[k].TradingitemInTransit;
           var WareHouseOpenOrder=jsonObj[k].WareHouseOpenOrder;
           var QualityUnderHoldQty=jsonObj[k].QualityUnderHoldQty;
           var BlockedQty=jsonObj[k].Blocked_qty;
           var OpenSalesOrder=jsonObj[k].OpenSalesOrder;
           var SalesAmount=jsonObj[k].SalesAmount;
           var OpenPO=jsonObj[k].OpenPO;
           var Field2=jsonObj[k].Field2;
           
           //var errfilepath=__dirname + "/ErrUpload/SKUMasterError.csv";
          
              var mysqlvar="SET @TransactionDate = ?;SET @SKUCode = ?;SET @NodeCode=?;SET @ReciptQty=?;SET @SalesQTY=?;SET @SalesReturn=?;SET @ClosingQty=?; \
              SET @InTransit=?;SET @TradingitemInTransit=?;SET @WareHouseOpenOrder=?;SET @QualityUnderHoldQty=?;SET @BlockedQty=?; \
              SET @OpenSalesOrder=?;SET @SalesAmount=?;SET @OpenPO=?;SET @Field2=?; \
              CALL UploadTransaction_procedure(@TransactionDate ,@SKUCode ,@NodeCode,@ReciptQty,@SalesQTY,@SalesReturn,@ClosingQty,@InTransit,@TradingitemInTransit,@WareHouseOpenOrder,@QualityUnderHoldQty,@BlockedQty,@OpenSalesOrder,@SalesAmount,@OpenPO,@Field2);";
              mysql.query(mysqlvar,[TransactionDate ,SKUCode ,NodeCode,ReciptQty,SalesQTY,SalesReturn,ClosingQty,InTransit,TradingitemInTransit,WareHouseOpenOrder,QualityUnderHoldQty,BlockedQty,OpenSalesOrder,SalesAmount,OpenPO,Field2], (err,rows,fields) =>{
                if(!err){
                
                //   console.log(Object.values(JSON.parse(JSON.stringify(rows))));
                //   var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
                //              resultArray.forEach(element => {
                //                     if(element.constructor==Array){                                
                                        
                //                         if(element[0].SkuID=0){
                //                           console.log(element[0].SkuID);
                //                         }
                //                     }
                //                 });
                    
                    if(counter == jsonObj.length - 1) {                       
                        res.json({error_code:0,err_desc:null});
                    }
                   // console.log(jsonObj.length);
                    counter++;
                }else{
                    console.log(err);
                }
              });
          // }
           
              
        
         }
 
     });

});
       


module.exports = router;