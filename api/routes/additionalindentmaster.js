const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get all active indentype
router.get('/indentype/', (req,res,next) => {
   
    mysql.query('select indentypeID ,indentype from indentype_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all  Additionalindent
router.get('/AdditionalindentGrid/', (req,res,next) => {
   var myproc= "CALL Additionindentgrid_procedure()";
    mysql.query('SELECT adt.additionalindentID,adt.Quantity,adt.skuid,nm.Material_Code as skucode,adt.recieingnodeid, \
    (select NodeCode from node_master_table where adt.recieingnodeid=node_master_table.Node_ID) as Recievenodecode,  \
            adt.indenttypeid,indentype_table.indentype,adt.comments,DATE_FORMAT(adt.LastUpdateDate, "%d %M %Y") as LastUpdateDate,adt.UpdatedBy as uid ,um.name as UpdatedBy, \
            adt.yearid,(SELECT year FROM year_table where adt.yearid=year_table.yearid) as year, \
            adt.monthid,(SELECT month_name FROM month_table where adt.monthid=month_table.monthid) as month,adt.quarterId \
            FROM additionalindent_table adt  join sku_master_table  nm on adt.skuid=nm.Sku_ID  \
         join indentype_table on adt.indenttypeid=indentype_table.indentypeID \
         left join user_master_table um on adt.UpdatedBy=um.User_ID', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//Get details  Additionalindent
router.get('/AdditionalindentEdit/:additionalID', (req,res,next) => {
    const ID = req.params.additionalID;
    mysql.query('SELECT adt.additionalindentID,adt.Quantity,adt.skuid,nm.Material_Code as skucode,adt.recieingnodeid, \
    (select NodeCode from node_master_table where adt.recieingnodeid=node_master_table.Node_ID) as Recievenodecode, adt.indenttypeid,indentype_table.indentype, \
        adt.comments,adt.LastUpdateDate,adt.UpdatedBy,adt.yearid,adt.monthid,adt.quarterId    FROM additionalindent_table adt  join sku_master_table  nm on adt.skuid=nm.Sku_ID \
     join indentype_table on adt.indenttypeid=indentype_table.indentypeID where adt.additionalindentID = ?', [req.params.additionalID],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.put('/', (req,res,next) => {
  
    let add=req.body;
          var mysqlvar="SET @additionalindentID = ?;SET @Quantity = ?;SET @skuid = ?;SET @recieingnodeid = ?;SET @indenttypeid=?;SET @comments=?;SET @UpdatedBy=?;SET @yearid=?;SET @monthid=?;SET @quarterId=?; \
          CALL additionalindent_procedure(@additionalindentID,@Quantity,@skuid,@recieingnodeid,@indenttypeid,@comments,@UpdatedBy,@yearid,@monthid,@quarterId);";
          mysql.query(mysqlvar,[add.additionalindentID,add.Quantity,add.skuid,add.recieingnodeid,add.indenttypeid,add.comments,add.UpdatedBy,add.yearid,add.monthid,add.quarterId], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.post('/', (req,res,next) => {
  
    let add=req.body;
          var mysqlvar="SET @additionalindentID = ?;SET @Quantity = ?;SET @skuid = ?;SET @recieingnodeid = ?;SET @indenttypeid=?;SET @comments=?;SET @UpdatedBy=?;SET @yearid=?;SET @monthid=?;SET @quarterId=?; \
          CALL additionalindent_procedure(@additionalindentID,@Quantity,@skuid,@recieingnodeid,@indenttypeid,@comments,@UpdatedBy,@yearid,@monthid,@quarterId);";
          mysql.query(mysqlvar,[add.additionalindentID,add.Quantity,add.skuid,add.recieingnodeid,add.indenttypeid,add.comments,add.UpdatedBy,add.yearid,add.monthid,add.quarterId], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});

//Get all active indentype
router.get('/Monthdd/', (req,res,next) => {
   
    mysql.query('select monthid ,month_name from month_table ', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active indentype
router.get('/Yearddl/', (req,res,next) => {
   
    mysql.query('select yearid ,year from year_table', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.get('/AddindentdtlsID/:SKUID/:NodeID', (req,res,next) => {
    const CatCode = req.params.CatCode;
    mysql.query('SELECT count(additionalindentID) as indentIDcnt  FROM additionalindent_table where skuid= ? and recieingnodeid=?',[req.params.skuid,req.params.recieingnodeid],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

module.exports = router;