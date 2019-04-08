const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


router.get('/producttype/', (req,res,next) => {
    mysql.query('select ProductTypeID,ProductTypeName from producttype_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });
  
  });

router.post('/', (req,res,next) => {
  
    let sku=req.body;
          var mysqlvar="SET @SkuID = ?;SET @MaterialCode = ?;SET @MaterialDesc = ?;SET @CasePackSize=?;SET @InnerPackSize=?;SET @CasePackVolperUnit=?;SET @InnerPackVolperUnit=?;SET @WSP=?;SET @UpdatedBy=?;SET @Status=?;SET @ProductTypeID=?;SET @NPD=?;SET @UOM=?;SET @MaxCapacity=?; \
          CALL sku_master_procedure(@SkuID,@MaterialCode,@MaterialDesc,@CasePackSize,@InnerPackSize,@CasePackVolperUnit,@InnerPackVolperUnit,@WSP,@UpdatedBy,@Status,@ProductTypeID,@NPD,@UOM,@MaxCapacity);";
          mysql.query(mysqlvar,[sku.SkuID,sku.MaterialCode,sku.MaterialDesc,sku.CasePackSize,sku.InnerPackSize,sku.CasePackVolperUnit,sku.InnerPackVolperUnit,sku.WSP,sku.UpdatedBy,sku.Status,sku.ProductTypeID,sku.NPD,sku.UOM,sku.MaxCapacity], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});


router.put('/', (req,res,next) => {
  
    let sku=req.body;
    var mysqlvar="SET @SkuID = ?;SET @MaterialCode = ?;SET @MaterialDesc = ?;SET @CasePackSize=?;SET @InnerPackSize=?;SET @CasePackVolperUnit=?;SET @InnerPackVolperUnit=?;SET @WSP=?;SET @UpdatedBy=?;SET @Status=?;SET @ProductTypeID=?;SET @NPD=?;SET @UOM=?;SET @MaxCapacity=?; \
    CALL sku_master_procedure(@SkuID,@MaterialCode,@MaterialDesc,@CasePackSize,@InnerPackSize,@CasePackVolperUnit,@InnerPackVolperUnit,@WSP,@UpdatedBy,@Status,@ProductTypeID,@NPD,@UOM,@MaxCapacity);";
    mysql.query(mysqlvar,[sku.SkuID,sku.MaterialCode,sku.MaterialDesc,sku.CasePackSize,sku.InnerPackSize,sku.CasePackVolperUnit,sku.InnerPackVolperUnit,sku.WSP,sku.UpdatedBy,sku.Status,sku.ProductTypeID,sku.NPD,sku.UOM,sku.MaxCapacity], (err,rows,fields) =>{
      if(!err){
          res.send(rows);
           
        }else{
            console.log(err);
        }
      
   });
});

//Get details of skuid
router.get('/:skuid', (req,res,next) => {
  const skuid = req.params.skuid;
  mysql.query('select * from sku_master_table where Sku_ID = ?',[req.params.skuid], (err,rows,fields) =>{
         
              if(!err){
                  res.send(rows);
              }else{
                  console.log(err);
              }
           });

});
router.get('/SKUdtlsID/:SKUCode', (req,res,next) => {
    const SKUCode = req.params.SKUCode;
    mysql.query('SELECT count(Sku_ID) as SKUIDcount FROM sku_master_table  where Material_Code = ?',[req.params.SKUCode],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.get('/', (req,res,next) => {
  const userid = req.params.userid;
  mysql.query(' SELECT Sku_ID,Material_Code,Material_Description,Case_Pack_Size,Inner_Pack_Size,Case_Pack_Volume_per_Unit,Inner_Pack_Volume_per_Unit,WSP, \
  Effective_Date,DATE_FORMAT(LastUpdated_Date, "%d %M %Y") as LastUpdated_Date,Updated_By,Status,whenentered , \
  (select Name from user_master_table where user_master_table.User_ID=sku_master_table.Updated_By) as UpdatedName,ProductTypeId, \
  (select ProductTypeName from producttype_table where producttype_table.ProductTypeID=sku_master_table.ProductTypeId) as Producttypename, NPD,UOM FROM sku_master_table', (err,rows,fields) =>{
         
              if(!err){
                  res.send(rows);
              }else{
                  console.log(err);
              }
           });

});


module.exports = router;