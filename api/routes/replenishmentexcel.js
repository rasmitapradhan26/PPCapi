const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');

const multer = require('multer');
var fs = require('fs');
var dest=__dirname + '/uploads';

/** API path that will upload the files  of SKUmaster*/
router.post('/upload/ReplenishmentMaster', function(req, res) {
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb) {
                cb(null, dest);
            },
            filename: function (req, file, cb) {
            //console.log(file);
            //console.log(file.fieldname);
            
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
       
         if(err){
              //res.json({error_code:1,err_desc:err});
              return;
              
         }
         // res.json({error_code:0,err_desc:null});
          
        //console.log(req.file.path);
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
   var filePath = __dirname + "/csvfileupload/ReplenishmentMaster.csv";
   console.log(filePath);
   fs.readFile(filePath, {
       encoding: 'utf-8'
     }, function(err, csvData) {
       if (err) {
         console.log(err);
       }
       console.log(filePath);
       csvParser(csvData, {
         delimiter: ' '
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

          var TransactionDate =jsonObj[k].Transaction_Date;
          var SKUCode =jsonObj[k].SKU_Code;
          var SKUDescription =jsonObj[k].SKU_Description;
          var NodeCode =jsonObj[k].Node_Code;
          var NodeName =jsonObj[k].Node_Name;
          var SalesTillDate =jsonObj[k].Sales_Till_Date;
          var SalesReturnsTillDate =jsonObj[k].Sales_Returns_Till_Date;
          var BufferNorm =jsonObj[k].Buffer_Norm;
          var ClosingQuantity =jsonObj[k].Closing_Quantity;
          var ClosingStockZone =jsonObj[k].Closing_Stock_Zone;
          var ClosingStockPenetration =jsonObj[k].Closing_Stock_Penetration;
          var Intransit =jsonObj[k].Intransit;
          var OpenWarehouseorder =jsonObj[k].Open_Warehouse_order;
          var PendingOrders =jsonObj[k].Pending_Orders;
          var AdditionalIndent =jsonObj[k].Additional_Indent;
          var TotalStockZone =jsonObj[k].Total_Stock_Zone;
          var ReplenishmentQty =jsonObj[k].Replenishment_Qty;
          var TotalPenetration =jsonObj[k].Total_Penetration;
          var AllocationagainstOrder =jsonObj[k].Allocation_against_Order;
          var AllocationagainstAdditionalIndent =jsonObj[k].Allocation_against_Additional_Indent;
          var AllocationagainstBaseStock =jsonObj[k].Allocation_against_Base_Stock;
          var TotalAllocation =jsonObj[k].Total_Allocation;
          var Finalallocation =jsonObj[k].Final_allocation;
          var CartonSize =jsonObj[k].Carton_Size;
          var ShipperSize =jsonObj[k].Shipper_Size;
          var AllocationinPrimaryPacking =jsonObj[k].Allocation_in_Primary_Packing;
          var CFT =jsonObj[k].CFT;
          var SupplyFrom =jsonObj[k].Supply_From;
          var PrimarySupplyingNode =jsonObj[k].Primary_Supplying_Node;
          var PrimarySupplyingNodeClosingStock =jsonObj[k].Primary_Supplying_Node_Closing_Stock;
          var PrimarySupplyingNodeZone =jsonObj[k].Primary_Supplying_Node_Zone;
          var WOagainstConfirmedOrder =jsonObj[k].WO_against_Confirmed_Order;
          var WOagainstAdditionalIndent =jsonObj[k].WO_against_Additional_Indent;
          var WOagainstBaseStock =jsonObj[k].WO_against_Base_Stock;
          var SecondarySupplyNode =jsonObj[k].Secondary_Supply_Node;
          var AvailableQtyatSecondarySupplyNode =jsonObj[k].Available_Qty_at_Secondary_Supply_Node;
          var BlockedQuantity =jsonObj[k].Blocked_Quantity;
          var QualityHold =jsonObj[k].Quality_Hold;
          var Receipts =jsonObj[k].Receipts;
          var Comments =jsonObj[k].Comments;
          var Category1 =jsonObj[k].Category1;
          var Category2 =jsonObj[k].Category2;
          var Category3 =jsonObj[k].Category3;
          var Classification =jsonObj[k].Classification;
          var PTS =jsonObj[k].PTS;
          var Field1 =jsonObj[k].Field1;
          var Field2 =jsonObj[k].Field2;
           console.log(TransactionDate);
         
              var mysqlvar="SET @TransactionDate=?;SET @SKUCode=?; SET @SKUDescription=?; SET @NodeCode=?;SET @NodeName=?;SET @SalesTillDate=?; \
              SET @SalesReturnsTillDate=?;SET @BufferNorm=?; SET @ClosingQuantity=?; SET @ClosingStockZone=?;SET @ClosingStockPenetration=?; \
              SET @Intransit=?;SET @OpenWarehouseorder=?;SET @PendingOrders =?;SET @AdditionalIndent =?;SET @TotalStockZone=?;SET @ReplenishmentQty =?; \
              SET @TotalPenetration=?;SET @AllocationagainstOrder=?;SET @AllocationagainstAdditionalIndent=?;SET @AllocationagainstBaseStock=?; \
              SET @TotalAllocation=?;SET @Finalallocation=?;SET @CartonSize=?;SET @ShipperSize=?;SET @AllocationinPrimaryPacking=?;SET @CFT=?;SET @SupplyFrom=?; \
              SET @PrimarySupplyingNode=?;SET @PrimarySupplyingNodeClosingStock=?;SET @PrimarySupplyingNodeZone=?;SET @WOagainstConfirmedOrder=?;SET @WOagainstAdditionalIndent=?; \
              SET @WOagainstBaseStock=?;SET @SecondarySupplyNode=?;SET @AvailableQtyatSecondarySupplyNode=?;SET @BlockedQuantity=?; \
              SET @QualityHold=?;SET @Receipts=?;SET @Comments =?;SET @Category1=?;SET @Category2=?;SET @Category3=?;SET @Classification=?;SET @PTS=?;SET @Field1=?;SET @Field2=?; \
              CALL Replenishmentxslsupload_procedure(@TransactionDate,@SKUCode, @SKUDescription, @NodeCode,@NodeName,@SalesTillDate, @SalesReturnsTillDate,@BufferNorm, @ClosingQuantity, @ClosingStockZone,@ClosingStockPenetration,@Intransit,@OpenWarehouseorder,@PendingOrders ,@AdditionalIndent ,@TotalStockZone,@ReplenishmentQty ,@TotalPenetration,@AllocationagainstOrder,@AllocationagainstAdditionalIndent,@AllocationagainstBaseStock,@TotalAllocation,@Finalallocation,@CartonSize,@ShipperSize,@AllocationinPrimaryPacking,@CFT,@SupplyFrom,@PrimarySupplyingNode,@PrimarySupplyingNodeClosingStock,@PrimarySupplyingNodeZone,@WOagainstConfirmedOrder,@WOagainstAdditionalIndent,@WOagainstBaseStock,@SecondarySupplyNode,@AvailableQtyatSecondarySupplyNode,@BlockedQuantity,@QualityHold,@Receipts,@Comments ,@Category1,@Category2,@Category3,@Classification,@PTS,@Field1,@Field2)";
              mysql.query(mysqlvar,[TransactionDate,SKUCode, SKUDescription, NodeCode,NodeName,SalesTillDate, SalesReturnsTillDate,BufferNorm, ClosingQuantity, ClosingStockZone,ClosingStockPenetration,Intransit,OpenWarehouseorder,PendingOrders ,AdditionalIndent ,TotalStockZone,ReplenishmentQty ,TotalPenetration,AllocationagainstOrder,AllocationagainstAdditionalIndent,AllocationagainstBaseStock,TotalAllocation,Finalallocation,CartonSize,ShipperSize,AllocationinPrimaryPacking,CFT,SupplyFrom,PrimarySupplyingNode,PrimarySupplyingNodeClosingStock,PrimarySupplyingNodeZone,WOagainstConfirmedOrder,WOagainstAdditionalIndent,WOagainstBaseStock,SecondarySupplyNode,AvailableQtyatSecondarySupplyNode,BlockedQuantity,QualityHold,Receipts,Comments ,Category1,Category2,Category3,Classification,PTS,Field1,Field2], (err,rows,fields) =>{
                if(!err){
                
               //   console.log(Object.values(JSON.parse(JSON.stringify(rows))));
                  // var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
                  //            resultArray.forEach(element => {
                  //                   if(element.constructor==Array){                                
                                        
                  //                       if(element[0].replenishmentid=0){
                  //                         console.log(element[0].replenishmentid);
                  //                       }
                  //                   }
                  //               });
                  if(counter == jsonObj.length - 1) {                       
                    res.json({error_code:0,err_desc:null});
                  }
                  counter++;
                   
                }else{
                    console.log(err);
                }
              });
          
              
        
         }
 
     });

});
       


router.get('/ReplenishmentGrid/', (req,res,next) => {
  mysql.query('SELECT rpm.replenishmentid,rpm.Transaction_Date,rpm.SKU_Code,(select Material_Code from  sku_master_table where rpm.SKU_Code=sku_master_table.Sku_ID) as skumaterialcode, \
  rpm.SKU_Description,rpm.Node_Code,  (select NodeCode from  node_master_table where rpm.Node_Code=node_master_table.Node_ID) as NodeCode, rpm.Node_Name,rpm.Sales_Till_Date, \
  rpm.Sales_Returns_Till_Date,rpm.Buffer_Norm,rpm.Closing_Quantity,rpm.Closing_Stock_Zone,rpm.Closing_Stock_Penetration,rpm.Intransit, rpm.Open_Warehouse_order, \
  rpm.Pending_Orders,rpm.Additional_Indent,rpm.Total_Stock_Zone,rpm.Replenishment_Qty,rpm.Total_Penetration,rpm.Allocation_against_Order,rpm.Allocation_against_Additional_Indent, \
  rpm.Allocation_against_Base_Stock,rpm.Total_Allocation,rpm.Final_allocation,rpm.Carton_Size,rpm.Shipper_Size,rpm.Allocation_in_Primary_Packing,rpm.CFT,rpm.Supply_From, \
  (select NodeCode from  node_master_table where rpm.Supply_From=node_master_table.Node_ID) as Supply_FromNodeCode, \
  rpm.Primary_Supplying_Node,(select NodeCode from  node_master_table where rpm.Primary_Supplying_Node=node_master_table.Node_ID) as Primary_Supplying_NodeCode, \
  rpm.Primary_Supplying_Node_Closing_Stock, rpm.Primary_Supplying_Node_Zone,rpm.WO_against_Confirmed_Order,rpm.WO_against_Additional_Indent, \
  rpm.WO_against_Base_Stock,rpm.Secondary_Supply_Node,  (select NodeCode from  node_master_table where rpm.Secondary_Supply_Node=node_master_table.Node_ID) as Secondary_Supply_NodeCode, \
  rpm.Available_Qty_at_Secondary_Supply_Node,rpm.Blocked_Quantity,rpm.Quality_Hold,rpm.Receipts, rpm.Comments,rpm.Category1, \
    (select Code from category_master_table where rpm.Category1=category_master_table.CategoryID) as Category1Code,   rpm.Category2, \
  (select Code from category_master_table where rpm.Category2=category_master_table.CategoryID) as Category2Code,   rpm.Category3, \
    (select Code from category_master_table where rpm.Category3=category_master_table.CategoryID) as Category3Code, rpm.Classification,rpm.PTS,rpm.Field1,rpm.Field2,rpm.whenupload \
  FROM replenishmentmasterw_table rpm ', (err,rows,fields) =>{
           
    if(!err){
        res.send(rows);
    }else{
        console.log(err);
    }
 });
});
 

module.exports = router;