const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get all active rawmaterial 
router.get('/skuddl/', (req,res,next) => {
   
    mysql.query('SELECT Sku_ID,Material_Code FROM sku_master_table where Status=1 order by Material_Code asc', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active roles 
router.get('/nodeddl/', (req,res,next) => {
   
    mysql.query('select Node_ID as NodeID,NodeCode as Nodecode from node_master_table where Status = 1 order by NodeCode asc ', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/skunodemapgrid/', (req,res,next) => {
   
    mysql.query('SELECT sn.skundemapid,sn.skuid,nm.Material_Code,sn.reciveNodeID,(select NodeCode from node_master_table where sn.reciveNodeID=node_master_table.Node_ID) as Recievenodecode, \
    sn.supplyNodeID,(select NodeCode from node_master_table where sn.supplyNodeID=node_master_table.Node_ID) as supplynodecode, sn.priority,sn.safetystock, \
    sn.leadtime,DATE_FORMAT(sn.Effectivefrom, "%d %M %Y") as Effectivefrom,DATE_FORMAT(sn.lastupdateddate, "%d %M %Y") as lastupdateddate,sn.Updatedby as uid,um.name as Updatedby  \
    FROM skunode_mapping_table sn left join sku_master_table  nm on sn.skuid=nm.Sku_ID left join user_master_table um on um.User_ID=sn.Updatedby', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/skunodemapedit/:skumapid', (req,res,next) => {
    const rawid = req.params.skumapid;
    mysql.query('SELECT sn.skundemapid,sn.skuid,nm.Material_Code,sn.reciveNodeID,(select NodeCode from node_master_table where sn.reciveNodeID=node_master_table.Node_ID) as Recievenodecode, \
    sn.supplyNodeID,(select NodeCode from node_master_table where sn.supplyNodeID=node_master_table.Node_ID) as supplynodecode, \
    sn.priority,sn.safetystock,sn.leadtime,sn.Effectivefrom,sn.lastupdateddate,sn.Updatedby \
    FROM skunode_mapping_table sn left join sku_master_table  nm on sn.skuid=nm.Sku_ID  where skundemapid = ?',[req.params.skumapid], (err,rows,fields) =>{
                    
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


router.put('/', (req,res,next) => {
  
    let skunode=req.body;
          var mysqlvar="SET @skundemapid = ?;SET @skuid = ?;SET @reciveNodeID = ?;SET @supplyNodeID = ?;SET @priority=?;SET @safetystock=?;SET @leadtime=?;SET @Effectivefrom=?;SET @Updatedby=?; \
          CALL skunodemapping_procedure(@skundemapid,@skuid,@reciveNodeID,@supplyNodeID,@priority,@safetystock,@leadtime,@Effectivefrom,@Updatedby);";
          mysql.query(mysqlvar,[skunode.skundemapid,skunode.skuid,skunode.reciveNodeID,skunode.supplyNodeID,skunode.priority,skunode.safetystock,skunode.leadtime,skunode.Effectivefrom,skunode.Updatedby], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.post('/', (req,res,next) => {
  
    let skunode=req.body;
          var mysqlvar="SET @skundemapid = ?;SET @skuid = ?;SET @reciveNodeID = ?;SET @supplyNodeID = ?;SET @priority=?;SET @safetystock=?;SET @leadtime=?;SET @Effectivefrom=?;SET @Updatedby=?; \
          CALL skunodemapping_procedure(@skundemapid,@skuid,@reciveNodeID,@supplyNodeID,@priority,@safetystock,@leadtime,@Effectivefrom,@Updatedby);";
          mysql.query(mysqlvar,[skunode.skundemapid,skunode.skuid,skunode.reciveNodeID,skunode.supplyNodeID,skunode.priority,skunode.safetystock,skunode.leadtime,skunode.Effectivefrom,skunode.Updatedby], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.get('/SKUNodedtlsID/:SKUID/:RecieveNodeID/:SupplyNodeId', (req,res,next) => {
    const CatCode = req.params.CatCode;
    mysql.query('SELECT count(skundemapid) as SkuNodeCodecount FROM skunode_mapping_table \
     where skuid= ? and reciveNodeID=? and supplyNodeID=?',[req.params.SKUID,req.params.RecieveNodeID,req.params.SupplyNodeId],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
module.exports = router;