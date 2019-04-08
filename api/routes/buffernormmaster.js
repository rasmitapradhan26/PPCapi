const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')

//Get all active roles 
router.get('/nodeddl/', (req,res,next) => {
   
    mysql.query('select Node_ID as NodeID,NodeCode as Nodecode from node_master_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/buffernormgrid/', (req,res,next) => {
   
    mysql.query('SELECT bm.buffernormID,bm.SKUId,sm.Material_Code as Skucode,bm.NodeId,nm.NodeCode as NodeCode, \
    bm.Remarks,DATE_FORMAT(bm.LastUpdatedDate, "%d %M %Y") as LastUpdatedDate,bm.UpdatedBy as uid,um.name as UpdatedBy, \
    bm.Q1BufferNorm,bm.Q2BufferNorm,bm.Q3BufferNorm,bm.Q4BufferNorm,bm.yearid,(select year from year_table where year_table.yearid=bm.yearid) as yearname \
    FROM buffernormmaster_table bm left join node_master_table nm on nm.Node_ID=bm.NodeId \
    left join sku_master_table sm on sm.Sku_ID=bm.SKUId left join user_master_table um on um.User_ID=bm.UpdatedBy', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/buffernormedit/:BufID', (req,res,next) => {
    const BufID = req.params.BufID;
    mysql.query('SELECT bm.buffernormID,bm.SKUId,sm.Material_Code as Skucode,bm.NodeId,nm.NodeCode as NodeCode, \
    bm.Remarks,bm.LastUpdatedDate,bm.UpdatedBy ,bm.Q1BufferNorm,bm.Q2BufferNorm,bm.Q3BufferNorm,bm.Q4BufferNorm,bm.yearid FROM buffernormmaster_table bm left join node_master_table nm on nm.Node_ID=bm.NodeId \
    left join sku_master_table sm on sm.Sku_ID=bm.SKUId where bm.BufferNormID = ?',[req.params.BufID], (err,rows,fields) =>{
                    
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


router.put('/', (req,res,next) => {
  
    let buff=req.body;
    let total=parseInt(buff.Q1BufferNorm) + parseInt(buff.Q2BufferNorm) + parseInt(buff.Q3BufferNorm) + parseInt(buff.Q4BufferNorm);
    var mysqlvar="SET @buffernormID = ?;SET @Sku_ID = ?;SET @NodeID = ?;SET @Remarks=?;SET @UpdatedBy=?;SET @yearid=?;SET @nxtyearid=?;SET @Q1BufferNorm=?;SET @Q2BufferNorm=?;SET @Q3BufferNorm=?;SET @Q4BufferNorm=?;SET @Q5BufferNorm=?;SET @total=?; \
    CALL buffernormmaster_procedure(@buffernormID,@Sku_ID,@NodeID,@Remarks,@UpdatedBy,@yearid,@nxtyearid,@Q1BufferNorm,@Q2BufferNorm,@Q3BufferNorm,@Q4BufferNorm,@Q5BufferNorm,@total);";
    mysql.query(mysqlvar,[buff.buffernormID,buff.Sku_ID,buff.NodeID,buff.Remarks,buff.UpdatedBy,buff.yearid,buff.nxtyearid,buff.Q1BufferNorm,buff.Q2BufferNorm,buff.Q3BufferNorm,buff.Q4BufferNorm,buff.Q5BufferNorm,total], (err,rows,fields) =>{
      if(!err){
          res.send(rows);
           
        }else{
            console.log(err);
        }
      
   });
});
router.post('/', (req,res,next) => {
  
    let buff=req.body;
    console.log(buff);
    let total=parseInt(buff.Q1BufferNorm) + parseInt(buff.Q2BufferNorm) + parseInt(buff.Q3BufferNorm) + parseInt(buff.Q4BufferNorm);
    console.log(total);
          var mysqlvar="SET @buffernormID = ?;SET @Sku_ID = ?;SET @NodeID = ?;SET @Remarks=?;SET @UpdatedBy=?;SET @yearid=?;SET @nxtyearid=?;SET @Q1BufferNorm=?;SET @Q2BufferNorm=?;SET @Q3BufferNorm=?;SET @Q4BufferNorm=?;SET @Q5BufferNorm=?;SET @total=?; \
          CALL buffernormmaster_procedure(@buffernormID,@Sku_ID,@NodeID,@Remarks,@UpdatedBy,@yearid,@nxtyearid,@Q1BufferNorm,@Q2BufferNorm,@Q3BufferNorm,@Q4BufferNorm,@Q5BufferNorm,@total);";
          mysql.query(mysqlvar,[buff.buffernormID,buff.Sku_ID,buff.NodeID,buff.Remarks,buff.UpdatedBy,buff.yearid,buff.nxtyearid,buff.Q1BufferNorm,buff.Q2BufferNorm,buff.Q3BufferNorm,buff.Q4BufferNorm,buff.Q5BufferNorm,total], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.get('/buffernormdtlsID/:SKUID/:NodeID', (req,res,next) => {
    const CatCode = req.params.CatCode;
    mysql.query('SELECT count(buffernormID) as countbuffer  FROM buffernormmaster_table where SKUId= ? and NodeId=?',[req.params.SKUID,req.params.NodeID],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

module.exports = router;