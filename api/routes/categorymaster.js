const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get all active Catparent 
router.get('/categoryparent/', (req,res,next) => {
   
    mysql.query('select CategoryID,Code as catparentcode from category_master_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
router.get('/CategorydtlsID/:CatCode', (req,res,next) => {
    const CatCode = req.params.CatCode;
    mysql.query('SELECT count(CategoryID) as CatIDcount FROM category_master_table  where Code = ?',[req.params.CatCode],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active categorygid 
router.get('/categorygrid/', (req,res,next) => {
   
    mysql.query('SELECT cm.CategoryID,cm.Code,cm.Name,DATE_FORMAT(cm.EffectiveFrom, "%d %M %Y") as EffectiveFrom, \
    DATE_FORMAT(cm.LastUpdatedDate, "%d %M %Y") as LastUpdatedDate,cm.UpdatedBy as UpdatedByid,um.Name as UpdatedBy,cm.Status, \
    cm.ParentCode as parentcodeid,(select Code  from category_master_table where cm.ParentCode=category_master_table.CategoryID) as ParentCode \
                    FROM category_master_table cm   left join user_master_table um on cm.UpdatedBy=um.User_ID', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active categorygid 
router.get('/catdtls/:categoryid', (req,res,next) => {
    const categoryid = req.params.categoryid;
    mysql.query('SELECT cm.CategoryID,cm.Code,cm.Name,cm.ParentCode as parentcodeid,cm.EffectiveFrom,cm.LastUpdatedDate,cm.UpdatedBy,cm.Status, \
    (select Code  from category_master_table where cm.ParentCode=category_master_table.CategoryID) as ParentCode \
                 FROM category_master_table cm  left join user_master_table um on cm.UpdatedBy=um.User_ID  \
                 where cm.CategoryID = ?',[req.params.categoryid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.put('/', (req,res,next) => {
  
    let cat=req.body;
          var mysqlvar="SET @CategoryID = ?;SET @Code = ?;SET @Name = ?;SET @catparentID=?;SET @UpdatedBy=?;SET @Status=?; \
          CALL categorymaster_procedure(@CategoryID,@Code,@Name,@catparentID,@UpdatedBy,@Status);";
          mysql.query(mysqlvar,[cat.CategoryID,cat.Code,cat.Name,cat.catparentID,cat.UpdatedBy,cat.Status], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.post('/', (req,res,next) => {
  
    let cat=req.body;
          var mysqlvar="SET @CategoryID = ?;SET @Code = ?;SET @Name = ?;SET @catparentID=?;SET @UpdatedBy=?;SET @Status=?; \
          CALL categorymaster_procedure(@CategoryID,@Code,@Name,@catparentID,@UpdatedBy,@Status);";
          mysql.query(mysqlvar,[cat.CategoryID,cat.Code,cat.Name,cat.catparentID,cat.UpdatedBy,cat.Status], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});


module.exports = router;