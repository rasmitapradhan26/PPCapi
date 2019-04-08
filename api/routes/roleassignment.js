const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')




//Get all data from Mainmodulemenu
router.get('/', (req,res,next) => {
    debugger;
    mysql.query('select * from mainmenu_table where status=1',(err,rows,fields) =>{ 
                if(!err){
                   
                   
                     res.status(200).json(rows);
                  
                }else{
                    console.log(err);
                }
             });
  
});

//Get all data from SecondMenu
router.get('/:parentmenuID/:RoleID', (req,res,next) => {
    
    const parentmenuID = req.params.parentmenuID;
    mysql.query('select ra.secondMenuId,ra.MainModuleID, sl.childmenu_name,ra.RoleID,ra.IsWeb from user_role_assignment_table ra \
                        right join secondlabelmenu_table sl on sl.idsecondlabelmenu=ra.secondMenuId  \
                  where sl.status=1 and sl.mainmenuid= ? and ra.RoleID= ?',[req.params.parentmenuID,req.params.RoleID],(err,rows,fields) =>{ 
                if(!err){
                  
                        res.status(200).json(rows);
                            
                       
                     
                  
                }else{
                    console.log(err);
                }
             });
  
});
//insert role access relation


//update Rolemaster
router.put('/', (req,res,next) => {
    debugger;
    let role=req.body;
        var mysqlvar="SET @SecondMenuID=?;SET @RoleID = ?;SET @MainModuleID = ?;SET @IsWeb = ?; \
        CALL Role_access_relation(@SecondMenuID,@RoleID,@MainModuleID,@IsWeb);";
        mysql.query(mysqlvar,[role.SecondMenuID,role.RoleID,role.MainModuleID,role.IsWeb], (err,rows,fields) =>{
     
          if(!err){
            res.send(rows);
             
          }else{
              console.log(err);
          }
       });
});

module.exports = router;