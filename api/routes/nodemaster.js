const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get all active nodetypes 
router.get('/nodetypes/', (req,res,next) => {
   
    mysql.query('select * from node_type_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//Get all active regioncode 
router.get('/regioncode/', (req,res,next) => {
   
    mysql.query('select * from region_code_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//Get all active nodedtls 
router.get('/allnodedtls/', (req,res,next) => {
   
    mysql.query('SELECT nm.Node_ID,nm.NodeCode as Code,nm.Name,nm.Node_Type,nt.node_type as nodetypename,nm.Address1,nm.Address2,nm.Pincode,nm.RegionCode,rc.region_code_Name, \
    nm.AreaSqft,DATE_FORMAT(nm.EffectiveFrom, "%d %M %Y") as EffectiveFrom,DATE_FORMAT(nm.LastUpdated_Date, "%d %M %Y") as LastUpdated_Date, \
    nm.Updated_By as NodeUpdateid,um.Name as Updated_By,nm.Status  FROM node_master_table nm  left join node_type_table nt on nm.Node_Type=nt.node_typeID \
    left join region_code_table rc on nm.RegionCode=rc.region_codeid  left join user_master_table um on nm.Updated_By=um.User_ID', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active nodedtls 
router.get('/nodedtls/:NodeID', (req,res,next) => {
    const NodeID = req.params.NodeID;
    mysql.query('SELECT nm.Node_ID,nm.NodeCode as Code,nm.Name,nm.Node_Type,nt.node_type as nodetypename,nm.Address1,nm.Address2,nm.Pincode,nm.RegionCode, \
    rc.region_code_Name,nm.AreaSqft,nm.EffectiveFrom,DATE_FORMAT(nm.LastUpdated_Date, "%d %M %Y") as LastUpdated_Date, \
    nm.Updated_By,nm.Status FROM node_master_table nm  left join node_type_table nt on nm.Node_Type=nt.node_typeID \
    left join region_code_table rc on nm.RegionCode=rc.region_codeid  where nm.Node_ID = ?',[req.params.NodeID],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.get('/nodedtlsID/:NodeCode', (req,res,next) => {
    const NodeID = req.params.NodeID;
    mysql.query('SELECT count(Node_ID) as NodeIDcount FROM node_master_table  where NodeCode = ?',[req.params.NodeCode],(err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.put('/', (req,res,next) => {
  
    let node=req.body;
          var mysqlvar="SET @NodeID = ?;SET @nodeCode = ?;SET @nodeName = ?;SET @NodeType=?;SET @Address1=?;SET @Address2=?;SET @Pincode=?;SET @RegionCode=?;SET @AreaSqft=?;SET @UpdatedBy=?;SET @Status=?; \
          CALL node_master_procedure(@NodeID,@nodeCode,@nodeName,@NodeType,@Address1,@Address2,@Pincode,@RegionCode,@AreaSqft,@UpdatedBy,@Status);";
          mysql.query(mysqlvar,[node.NodeID,node.nodeCode,node.nodeName,node.NodeType,node.Address1,node.Address2,node.Pincode,node.RegionCode,node.AreaSqft,node.UpdatedBy,node.Status], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});

router.post('/', (req,res,next) => {
  
    let node=req.body;
          var mysqlvar="SET @NodeID = ?;SET @nodeCode = ?;SET @nodeName = ?;SET @NodeType=?;SET @Address1=?;SET @Address2=?;SET @Pincode=?;SET @RegionCode=?;SET @AreaSqft=?;SET @UpdatedBy=?;SET @Status=?; \
          CALL node_master_procedure(@NodeID,@nodeCode,@nodeName,@NodeType,@Address1,@Address2,@Pincode,@RegionCode,@AreaSqft,@UpdatedBy,@Status);";
          mysql.query(mysqlvar,[node.NodeID,node.nodeCode,node.nodeName,node.NodeType,node.Address1,node.Address2,node.Pincode,node.RegionCode,node.AreaSqft,node.UpdatedBy,node.Status], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});

module.exports = router;