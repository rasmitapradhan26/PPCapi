const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')



//Get all active rawmaterial 
router.get('/skuddl/', (req,res,next) => {
   
    mysql.query('SELECT Sku_ID,Material_Code FROM sku_master_table where Status=1 ', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active rawmaterial 
router.get('/quarterddl/', (req,res,next) => {
   
    mysql.query('SELECT quarterId,quarter FROM quarter_table where status=1 ', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/forecastgrid/', (req,res,next) => {
   
    mysql.query(' SELECT fm.forecastID,fm.SKUId,fm.quantity,fm.remarks,DATE_FORMAT(fm.LastUpdatedDate, "%d %M %Y") as LastUpdatedDate ,fm.UpdatedBy as uid,um.name as UpdatedBy, \
    sm.Material_Code as skucode , sm.Material_Description as SkuDesc,fm.yearid,(SELECT year FROM year_table where fm.yearid=year_table.yearid) as year,fm.SkuCatid, (select Name  from category_master_table cm where cm.CategoryID=fm.SkuCatid) as skuCategoryName, \
    fm.monthid,(SELECT month_name FROM month_table where fm.monthid=month_table.monthid) as month,fm.quarterId,(SELECT quarter FROM quarter_table where fm.quarterId=quarter_table.quarterId) as quarter \
     FROM forecast_master_table fm left join sku_master_table sm on fm.SKUId=sm.Sku_ID left join user_master_table um on um.User_ID=fm.UpdatedBy', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get all active rawmaterial 
router.get('/forecastedit/:forecastid', (req,res,next) => {
    const forecastid = req.params.forecastid;
    mysql.query(' SELECT fm.forecastID,fm.SKUId,fm.quantity,fm.remarks,DATE_FORMAT(fm.LastUpdatedDate, "%d %M %Y") as LastUpdatedDate ,fm.UpdatedBy,sm.Material_Code as skucode, \
    sm.Material_Description as SkuDesc,fm.monthid,fm.yearid,fm.SkuCatid, (select Name  from category_master_table cm where cm.CategoryID=fm.SkuCatid) as skuCategoryName,fm.quarterId \
   FROM forecast_master_table fm left join sku_master_table sm on fm.SKUId=sm.Sku_ID where fm.forecastID = ?',[req.params.forecastid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


router.put('/', (req,res,next) => {
  
    let forecast=req.body;
          var mysqlvar="SET @forecastID = ?;SET @Sku_ID = ?;SET @quantity = ?;SET @remarks=?;SET @UpdatedBy=?;SET @monthid=?;SET @yearid=?;SET @SkuCatid=?;SET @quarterId=?; \
          CALL forecast_procedure(@forecastID,@Sku_ID,@quantity,@remarks,@UpdatedBy,@monthid,@yearid,@SkuCatid,@quarterId);";
          mysql.query(mysqlvar,[forecast.forecastID,forecast.Sku_ID,forecast.quantity,forecast.remarks,forecast.UpdatedBy,forecast.monthid,forecast.yearid,forecast.SkuCatid,forecast.quarterId], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.post('/', (req,res,next) => {
  
    let forecast=req.body;
    console.log(forecast);
    console.log(forecast.length);

          var mysqlvar="SET @forecastID = ?;SET @Sku_ID = ?;SET @quantity = ?;SET @remarks=?;SET @UpdatedBy=?;SET @monthid=?;SET @yearid=?;SET @SkuCatid=?;SET @quarterId=?; \
          CALL forecast_procedure(@forecastID,@Sku_ID,@quantity,@remarks,@UpdatedBy,@monthid,@yearid,@SkuCatid,@quarterId);";
          mysql.query(mysqlvar,[forecast.forecastID,forecast.Sku_ID,forecast.quantity,forecast.remarks,forecast.UpdatedBy,forecast.monthid,forecast.yearid,forecast.SkuCatid,forecast.quarterId], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});
router.get('/SkumatDesc/:skuid', (req,res,next) => {
   
    mysql.query('select Material_Description as materialDesc from sku_master_table  where Status = 1 and Sku_ID = ?',[req.params.skuid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
router.get('/SkuCatddl/:skuid', (req,res,next) => {
   
    mysql.query('select  sc.CategoryID, cm.Name as categoryname \
    from skucategory_map_table sc left join  category_master_table cm on sc.CategoryID=cm.CategoryID \
    where sc.SKUID = ?',[req.params.skuid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
router.get('/forecastcount/:skuid/:monthid/:yearid/:quarterId', (req,res,next) => {
   
    mysql.query('SELECT Count(forecastID) as countForecastid  FROM forecast_master_table \
    where SKUId = ?  and monthid=? and yearid= ? and quarterId=?',[req.params.skuid,req.params.monthid,req.params.yearid,req.params.quarterId], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

router.get('/forecastmonth/:quarterId', (req,res,next) => {
   
    mysql.query('SELECT qm.mapid,qm.quarterid,q.quarter,qm.monthid,(select month_name from month_table where qm.monthid=month_table.monthid) as monthname \
    FROM quartermonthmaping_table qm join quarter_table q on qm.quarterid=q.quarterId \
    where  qm.quarterid=?',[req.params.quarterId], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});



module.exports = router;