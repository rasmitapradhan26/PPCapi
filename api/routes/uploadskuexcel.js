const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');

const multer = require('multer');
var fs = require('fs');
var dest=__dirname + '/uploads';

/** API path that will upload the files  of SKUmaster*/
router.post('/upload/SKUmaster', function(req, res) {
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
              res.json({error_code:1,err_desc:err});
              return;
              
         }
          res.json({error_code:0,err_desc:null});
          
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
       fs.writeFile(__dirname + "/csvfileupload/SKUmaster.csv", writeStr, function(err) {
           if(err) {
               return console.log(err);
           }
           console.log("SKUmaster.csv was saved in the current directory!");
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
   var filePath = __dirname + "/csvfileupload/SKUmaster.csv";

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
         for(var k=0;k<jsonObj.length;k++){

          const json2csv = require('json2csv').parse;
          var json = jsonObj[k];
          
           var MaterialCode=jsonObj[k].Material_Code;
           var MaterialDesc=jsonObj[k].Material_Description;
           var CasePackSize=jsonObj[k].Case_Pack_Size;
           var InnerPackSize=jsonObj[k].Inner_Pack_Size;
           var CasePackVolperUnit=jsonObj[k].Case_Pack_Volume_per_Unit;
           var InnerPackVolperUnit=jsonObj[k].Inner_Pack_Volume_per_Unit;
           var WSP=jsonObj[k].WSP;
           var UpdatedBy=jsonObj[k].Updated_By;
           var Status=jsonObj[k].Status;
           var ProductType=jsonObj[k].ProductType;
           var NPD=jsonObj[k].NPD;
           var UOM=jsonObj[k].UOM;
           var MaxCapacity=jsonObj[k].MaxCapacity;
           var errfilepath=__dirname + "/ErrUpload/SKUMasterError.csv";
           //console.log(json);
          //  if (isNaN(CasePackSize)) {
          //   if (fs.existsSync(__dirname + "/ErrUpload/SKUMasterError.csv")) {
          //     console.log('Found file');//check file exist
                                
          //       fs.unlink(__dirname + "/ErrUpload/SKUMasterError.csv", function(error) {//delete file
          //         if (error) {
          //             throw error;
          //         }
          //        // console.log('Deleted dog.jpg!!');
                 
          //       });
          //   }
          //   console.log('CasePackSize is not a number'); 
           
          //   var Header = ['Material_Code', 'Material_Description', 'Case_Pack_Size','Inner_Pack_Size', 'Case_Pack_Volume_per_Unit', 'Inner_Pack_Volume_per_Unit','WSP','Updated_By','Status','ProductType','NPD','UOM'];
          //   var csv = json2csv({ data: json,fields: Header});
          //   console.log(csv);
          //       fs.writeFile(errfilepath, csv, function(err) {
          //         if (err) throw err;
          //         console.log('errfile saved');
          //         });
          //  } else if(isNaN(InnerPackSize)){
          //   console.log('InnerPackSize is not a number'); 
          //  } else if(isNaN(CasePackVolperUnit)){
          //   console.log('CasePackVolperUnit is not a number'); 
          //  }else if(isNaN(InnerPackVolperUnit)){
          //   console.log('InnerPackSize is not a number'); 
          //  } else if(isNaN(WSP)){
          //   console.log('WSP is not a number'); 
          //  }else{
              var mysqlvar="SET @MaterialCode = ?;SET @MaterialDesc = ?;SET @CasePackSize=?;SET @InnerPackSize=?;SET @CasePackVolperUnit=?;SET @InnerPackVolperUnit=?;SET @WSP=?;SET @UpdatedBy=?;SET @Status=?;SET @ProductType=?;SET @NPD=?;SET @UOM=?;SET @MaxCapacity=?; \
              CALL sku_master_excel_procedure(@MaterialCode,@MaterialDesc,@CasePackSize,@InnerPackSize,@CasePackVolperUnit,@InnerPackVolperUnit,@WSP,@UpdatedBy,@Status,@ProductType,@NPD,@UOM,@MaxCapacity);";
              mysql.query(mysqlvar,[MaterialCode,MaterialDesc,CasePackSize,InnerPackSize,CasePackVolperUnit,InnerPackVolperUnit,WSP,UpdatedBy,Status,ProductType,NPD,UOM,MaxCapacity], (err,rows,fields) =>{
                if(!err){
                
                  console.log(Object.values(JSON.parse(JSON.stringify(rows))));
                  var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
                             resultArray.forEach(element => {
                                    if(element.constructor==Array){                                
                                        
                                        if(element[0].SkuID=0){
                                          console.log(element[0].SkuID);
                                        }
                                    }
                                });
                   
                }else{
                    console.log(err);
                }
              });
          // }
           
              
        
         }
 
     });

});
       
router.post('/uploaddtls/SKUmasterInsert',  function(req, res) {
  
});



module.exports = router;