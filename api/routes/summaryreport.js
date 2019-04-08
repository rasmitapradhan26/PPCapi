const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get SummeryReport
router.get('/SummaryGrid/', (req,res,next) => {
   
    mysql.query('select bfm.buffernormID, bfm.SKUID,sm.Material_Code as skucode,sm.Material_Description as skuname,sm.WSP, bfm.CategoryID, \
    (select Code from  category_master_table where bfm.CategoryID=category_master_table.CategoryID)as producttype, \
    bfm.NodeId,nm.Code as PlantCode,fm.month,fm.quantity,rt.price as Price   from buffernormmaster_table bfm   join sku_master_table sm on bfm.SKUId=sm.Sku_ID \
    left join rawmaterial_table rt on rt.materialcode=sm.Sku_ID \
      join node_master_table nm on bfm.NodeId=nm.Node_ID join forecast_master_table fm on fm.SKUId =bfm.SKUId ', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


module.exports = router;