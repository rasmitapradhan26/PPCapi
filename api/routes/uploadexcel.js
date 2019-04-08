const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');

const multer = require('multer');
var fs = require('fs');
var dest=__dirname + '/uploads';
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
         

/** API path that will upload the files  of catgorymaster*/
router.post('/upload/Categorymaster', function(req, res) {
 // console.log(req.file);
  upload(req,res,function(err){
    console.log(req);
      if(err){
           //res.json({error_code:1,err_desc:err});
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
    fs.writeFile(__dirname + "/csvfileupload/CategoryMaster.csv", writeStr, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("CategoryMaster.csv was saved in the current directory!");
    });


    var csvParser = require('csv-parse');
    var filePath = __dirname + "/csvfileupload/CategoryMaster.csv";

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
          var Code=jsonObj[k].Code;
          var Name=jsonObj[k].Name;
          var ParentCode=jsonObj[k].ParentCode;
          var UpdatedBy=jsonObj[k].UpdatedBy;
          var Status=jsonObj[k].Status;
          
          var sql = "INSERT INTO category_master_table (Code, Name, ParentCode,UpdatedBy,Status) \
          VALUES ('"+Code+"', '"+Name+"', '"+ParentCode+"','"+UpdatedBy+"','"+Status+"')";

          mysql.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted, ID: " + result.insertId);
          });
        // console.log(jsonObj[k].Code);
        }

    })
  });
});

/** API path that will upload the files  of SKUmaster*/
router.post('/upload/SKUmaster', function(req, res) {
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
           var Material_Code=jsonObj[k].Material_Code;
           var Material_Description=jsonObj[k].Material_Description;
           var Case_Pack_Size=jsonObj[k].Case_Pack_Size;
           var Inner_Pack_Size=jsonObj[k].Inner_Pack_Size;
           var Case_Pack_Volume_per_Unit=jsonObj[k].Case_Pack_Volume_per_Unit;
           var Inner_Pack_Volume_per_Unit=jsonObj[k].Inner_Pack_Volume_per_Unit;
           var WSP=jsonObj[k].WSP;
           var Updated_By=jsonObj[k].Updated_By;
           var Status=jsonObj[k].Status;
           var ProductTypeId=jsonObj[k].ProductTypeId;
           var NPD=jsonObj[k].NPD;
           var UOM=jsonObj[k].UOM;
           
           var sql = "INSERT INTO sku_master_table(Material_Code,Material_Description,Case_Pack_Size,Inner_Pack_Size,Case_Pack_Volume_per_Unit,Inner_Pack_Volume_per_Unit,WSP,Updated_By,Status,ProductTypeId,NPD,UOM) \
           VALUES ('"+Material_Code+"', '"+Material_Description+"', '"+Case_Pack_Size+"','"+Inner_Pack_Size+"','"+Case_Pack_Volume_per_Unit+"','"+Inner_Pack_Volume_per_Unit+"', '"+WSP+"', '"+Updated_By+"','"+Status+"','"+ProductTypeId+"','"+NPD+"','"+UOM+"')";
 
           mysql.query(sql, function (err, result) {
             if (err) throw err;
             console.log("1 record inserted, ID: " + result.insertId);
           });
         // console.log(jsonObj[k].Code);
         }
 
     })
   });
 });

/** API path that will upload the files  of SKUCategoryMapping*/
router.post('/upload/SKUCategoryMapping', function(req, res) {
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
     fs.writeFile(__dirname + "/csvfileupload/SKUCategoryMapping.csv", writeStr, function(err) {
         if(err) {
             return console.log(err);
         }
         console.log("SKUCategoryMapping.csv was saved in the current directory!");
     });
 
 
     var csvParser = require('csv-parse');
     var filePath = __dirname + "/csvfileupload/SKUCategoryMapping.csv";
 
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
        // console.log(jsonObj);
         /**
          * [
          *  {a:"1", b:"2", c:"3"},
          *  {a:"4", b:"5". c:"6"}
          * ]
          */ 
         if (fs.existsSync(__dirname + "/ErrUpload/SKUCategoryMapError.csv")) {
          console.log('Found file');//check file exist
                            
            fs.unlink(__dirname + "/ErrUpload/SKUCategoryMapError.csv", function(error) {//delete file
              if (error) {
                  throw error;
              }
              console.log('Deleted dog.jpg!!');
             
            });
        }
         for(var k=0;k<jsonObj.length;k++){
          const json2csv = require('json2csv').parse;
           var SKuCode=jsonObj[k].SKuCode;
           var Categorycode=jsonObj[k].Categorycode;
           var UpadatedBy=jsonObj[k].UpadatedBy;
           
          //  var sql = "INSERT INTO skucategory_map_table(SKUID,CategoryID,UpadatedBy) \
          //  VALUES ('"+SKUID+"', '"+CategoryID+"', '"+UpadatedBy+"')";
          var mysqlvar="SET @SKuCode = ?;SET @Categorycode = ?;SET @UpadatedBy = ?; \
          CALL SkuCat_map_uload_procedure(@SKuCode,@Categorycode,@UpadatedBy);";
           mysql.query(mysqlvar,[SKuCode, Categorycode, UpadatedBy], (err,rows) =>{
             if (err) throw err;
             console.log(rows); 
             console.log(JSON.stringify(rows));
             
             console.log(JSON.stringify(rows[0].insertId));
             var result= JSON.stringify(rows[0].insertId);
             if(result==0){
                    console.log(result);
                    var fields = ['SKuCode', 'Categorycode', 'UpadatedBy'];
                    var mydata = [SKuCode, Categorycode, UpadatedBy];
                    console.log(fields);
                    console.log(mydata);
                    var csv = json2csv({ data: mydata, fields: fields });
                    console.log(csv);
                    var errfilepath=__dirname + "/ErrUpload/SKUCategoryMapError.csv";
                    
                    fs.writeFile(errfilepath, csv, function(err) {
                      if (err) throw err;
                    // console.log(csv);
                      res.send("done");
                    });

                    res.json({error_code:0,err_desc:'hdfgbjbdfj'});
              
             }
           });
         // console.log(jsonObj[k].Code);
         }
 
     })
   });
 });

 /** API path that will upload the files  of ReplenishmentMaster*/
router.post('/upload/ReplenishmentMaster', function(req, res) {
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
     fs.writeFile(__dirname + "/csvfileupload/ReplenishmentMaster.csv", writeStr, function(err) {
         if(err) {
             return console.log(err);
         }
         console.log("ReplenishmentMaster.csv was saved in the current directory!");
     });
 
 
     var csvParser = require('csv-parse');
     var filePath = __dirname + "/csvfileupload/ReplenishmentMaster.csv";
 
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
          
           
           var sql = "INSERT INTO replenishmentmasterw_table(Transaction_Date,SKU_Code,SKU_Description,Node_Code,Node_Name,Sales_Till_Date,Sales_Returns_Till_Date,Buffer_Norm,Closing_Quantity, \
            Closing_Stock_Zone,Closing_Stock_Penetration,Intransit,Open_Warehouse_order,Pending_Orders,Additional_Indent,Total_Stock_Zone,Replenishment_Qty, \
            Total_Penetration,Allocation_against_Order,Allocation_against_Additional_Indent,Allocation_against_Base_Stock,Total_Allocation,Final_allocation, \
            Carton_Size,Shipper_Size,Allocation_in_Primary_Packing,CFT,Supply_From,Primary_Supplying_Node,Primary_Supplying_Node_Closing_Stock, \
            Primary_Supplying_Node_Zone,WO_against_Confirmed_Order,WO_against_Additional_Indent,WO_against_Base_Stock,Secondary_Supply_Node, \
            Available_Qty_at_Secondary_Supply_Node,Blocked_Quantity,Quality_Hold,Receipts,Comments,Category1,Category2,Category3,Classification,PTS,Field1,Field2) \
           VALUES ('"+jsonObj[k].Transaction_Date+"','"+jsonObj[k].SKU_Code+"','"+jsonObj[k].SKU_Description+"','"+jsonObj[k].Node_Code+"','"+jsonObj[k].Node_Name+"','"+jsonObj[k].Sales_Till_Date+"','"+jsonObj[k].Sales_Returns_Till_Date+"','"+jsonObj[k].Buffer_Norm+"','"+jsonObj[k].Closing_Quantity+"', \
           '"+jsonObj[k].Closing_Stock_Zone+"','"+jsonObj[k].Closing_Stock_Penetration+"','"+jsonObj[k].Intransit+"','"+jsonObj[k].Open_Warehouse_order+"','"+jsonObj[k].Pending_Orders+"','"+jsonObj[k].Additional_Indent+"','"+jsonObj[k].Total_Stock_Zone+"','"+jsonObj[k].Replenishment_Qty+"', \
           '"+jsonObj[k].Total_Penetration+"','"+jsonObj[k].Allocation_against_Order+"','"+jsonObj[k].Allocation_against_Additional_Indent+"','"+jsonObj[k].Allocation_against_Base_Stock+"','"+jsonObj[k].Total_Allocation+"','"+jsonObj[k].Final_allocation+"', \
           '"+jsonObj[k].Carton_Size+"','"+jsonObj[k].Shipper_Size+"','"+jsonObj[k].Allocation_in_Primary_Packing+"','"+jsonObj[k].CFT+"','"+jsonObj[k].Supply_From+"','"+jsonObj[k].Primary_Supplying_Node+"','"+jsonObj[k].Primary_Supplying_Node_Closing_Stock+"', \
           '"+jsonObj[k].Primary_Supplying_Node_Zone+"','"+jsonObj[k].WO_against_Confirmed_Order+"','"+jsonObj[k].WO_against_Additional_Indent+"','"+jsonObj[k].WO_against_Base_Stock+"','"+jsonObj[k].Secondary_Supply_Node+"', \
           '"+jsonObj[k].Available_Qty_at_Secondary_Supply_Node+"','"+jsonObj[k].Blocked_Quantity+"','"+jsonObj[k].Quality_Hold+"','"+jsonObj[k].Receipts+"','"+jsonObj[k].Comments+"','"+jsonObj[k].Category1+"','"+jsonObj[k].Category2+"','"+jsonObj[k].Category3+"','"+jsonObj[k].Classification+"','"+jsonObj[k].PTS+"','"+jsonObj[k].Field1+"','"+jsonObj[k].Field2+"')";
 
           mysql.query(sql, function (err, result) {
             if (err) throw err;
             console.log("1 record inserted, ID: " + result.insertId);
           });
         // console.log(jsonObj[k].Code);
         }
 
     })
   });
 });
module.exports = router;