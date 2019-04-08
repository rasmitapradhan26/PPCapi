const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')

//Get all active roles 
router.get('/SkuDesc/:materialid', (req,res,next) => {
   
    mysql.query('select Material_Description as materialDesc from sku_master_table  where Status = 1 and Sku_ID = ?',[req.params.materialid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.get('/RawMatdtlsID/:RawCode', (req,res,next) => {
    const SKUCode = req.params.SKUCode;
    mysql.query('SELECT count(rawmaterialID) as RawIDcount FROM rawmaterial_table  where rawmaterialID = ?',[req.params.RawCode],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//Get all active rawmaterial 
router.get('/rawmaterialgrid/', (req,res,next) => {
   
    mysql.query(' SELECT rm.rawmaterialID,rm.materialcode ,rm.materialDesc,rm.MOQ,rm.price,DATE_FORMAT(rm.EffectiveDate, "%d %M %Y") as EffectiveDate , \
    rm.Status, DATE_FORMAT(rm.LastUpdatedDate, "%d %M %Y") as LastUpdatedDate,rm.UpdatedBy as uId ,um.Name as UpdatedBy \
     FROM rawmaterial_table rm left join user_master_table um on rm.UpdatedBy=um.User_ID', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/rawmaterialedit/:rawmaterialid', (req,res,next) => {
    const rawid = req.params.rawmaterialid;
    mysql.query('SELECT rm.rawmaterialID,rm.materialcode ,rm.materialDesc,rm.MOQ,rm.price,DATE_FORMAT(rm.EffectiveDate, "%d %M %Y") as EffectiveDate , \
    rm.Status, DATE_FORMAT(rm.LastUpdatedDate, "%d %M %Y") as LastUpdatedDate,rm.UpdatedBy FROM rawmaterial_table rm where rm.rawmaterialID = ?',[req.params.rawmaterialid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


router.put('/', (req,res,next) => {
  
    let raw=req.body;
          var mysqlvar="SET @rawmaterialID = ?;SET @materialcode = ?;SET @materialDesc = ?;SET @MOQ = ?;SET @price=?;SET @Status=?;SET @UpdatedBy=?; \
          CALL rawmaterial_procedure(@rawmaterialID,@materialcode,@materialDesc,@MOQ,@price,@Status,@UpdatedBy);";
          mysql.query(mysqlvar,[raw.rawmaterialID,raw.materialcode,raw.materialDesc,raw.MOQ,raw.price,raw.Status,raw.UpdatedBy], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.post('/', (req,res,next) => {
  
    let raw=req.body;
          var mysqlvar="SET @rawmaterialID = ?;SET @materialcode = ?;SET @materialDesc = ?;SET @MOQ = ?;SET @price=?;SET @Status=?;SET @UpdatedBy=?; \
          CALL rawmaterial_procedure(@rawmaterialID,@materialcode,@materialDesc,@MOQ,@price,@Status,@UpdatedBy);";
          mysql.query(mysqlvar,[raw.rawmaterialID,raw.materialcode,raw.materialDesc,raw.MOQ,raw.price,raw.Status,raw.UpdatedBy], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});

module.exports = router;