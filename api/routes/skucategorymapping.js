const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get all active roles 
router.get('/CatCode/', (req,res,next) => {
   
    mysql.query('select CategoryID ,code as Catcode from category_master_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/skucatmapgrid/', (req,res,next) => {
   
    mysql.query('SELECT sm.skucatID,sm.SKUID,sm.CategoryID,DATE_FORMAT(sm.Effectivefrom, "%d %M %Y") as Effectivefrom,DATE_FORMAT(sm.LastUpdateDate, "%d %M %Y") as LastUpdateDate, \
    sm.UpadatedBy as uid,um.Name as UpadatedBy,skm.Material_Code,skm.Material_Description,cm.code as Catcode \
                FROM skucategory_map_table sm left join sku_master_table skm on sm.SKUID=skm.Sku_ID \
                left join category_master_table cm on sm.CategoryID=cm.CategoryID   left join user_master_table um on sm.UpadatedBy=um.User_ID', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/skucatmapedit/:skumapid', (req,res,next) => {
    const rawid = req.params.skumapid;
    mysql.query('SELECT sm.skucatID,sm.SKUID,sm.CategoryID,sm.Effectivefrom,sm.LastUpdateDate,sm.UpadatedBy,skm.Material_Code,skm.Material_Description,cm.code as Catcode \
                FROM skucategory_map_table sm left join sku_master_table skm on sm.SKUID=skm.Sku_ID \
                left join category_master_table cm on sm.CategoryID=cm.CategoryID  where skucatID = ?',[req.params.skumapid], (err,rows,fields) =>{
                    
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


router.put('/', (req,res,next) => {
  
    let skucat=req.body;
          var mysqlvar="SET @skucatID = ?;SET @SKUID = ?;SET @CategoryID = ?;SET @UpadatedBy=?; \
          CALL skucategory_map_procedure(@skucatID,@SKUID,@CategoryID,@UpadatedBy);";
          mysql.query(mysqlvar,[skucat.skucatID,skucat.SKUID,skucat.CategoryID,skucat.UpadatedBy], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.post('/', (req,res,next) => {
  
    let skucat=req.body;
          var mysqlvar="SET @skucatID = ?;SET @SKUID = ?;SET @CategoryID = ?;SET @UpadatedBy=?; \
          CALL skucategory_map_procedure(@skucatID,@SKUID,@CategoryID,@UpadatedBy);";
          mysql.query(mysqlvar,[skucat.skucatID,skucat.SKUID,skucat.CategoryID,skucat.UpadatedBy], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});

router.get('/SKUCatdtlsID/:SKUID/:CategoryID', (req,res,next) => {
    const CatCode = req.params.CatCode;
    mysql.query('SELECT count(skucatID) as SkuCatCodecount FROM skucategory_map_table where SKUID= ? and CategoryID=?',[req.params.SKUID,req.params.CategoryID],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

module.exports = router;