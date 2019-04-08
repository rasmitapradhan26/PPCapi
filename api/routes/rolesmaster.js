const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')




//Get all data from rolemaster
router.get('/', (req,res,next) => {
    debugger;
    mysql.query('select * from role_master_table',(err,rows,fields) =>{ 
                if(!err){
                   // res.send(rows);
                   
                     res.status(200).json(rows);
                   // res.end(JSON.stringify(rows));
                }else{
                    console.log(err);
                }
             });
    // res.status(200).json({
    //     message:'rolesmaster get it works!'
    //  });
});

//Get details of roleid
router.get('/:roleid', (req,res,next) => {
    const roleid = req.params.roleid;
    mysql.query('select * from role_master_table where RoleID = ?',[req.params.roleid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//insert into rolemaster

router.post('/', (req,res,next) => {
  
    let role=req.body;
          var mysqlvar="SET @RoleID = ?;SET @RoleName = ?;SET @Description = ?;SET @Status=?; \
          CALL RoleMasterAddOrEdit(@RoleID,@RoleName,@Description,@Status);";
          mysql.query(mysqlvar,[role.RoleID,role.RoleName,role.Description,role.Status], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            // if(!err){
            //     rows.forEach(element => {
            //         if(element.constructor==Array){
            //             res.send('inserted RoleID:'+element[0].RoleID);
            //         }
            //     });
               
            // }else{
            //     console.log(err);
            // }
         });
});


//update Rolemaster
router.put('/', (req,res,next) => {
    debugger;
    let role=req.body;
        var mysqlvar="SET @RoleID = ?;SET @RoleName = ?;SET @Description = ?;SET @Status=?; \
        CALL RoleMasterAddOrEdit(@RoleID,@RoleName,@Description,@Status);";
        mysql.query(mysqlvar,[role.RoleID,role.RoleName,role.Description,role.Status], (err,rows,fields) =>{
     
          if(!err){
            res.send(rows);
             
          }else{
              console.log(err);
          }
       });
});

//Delete record on roleid
router.delete('/:roleid', (req,res,next) => {

    mysql.query('Delete from role_master_table where RoleID = ?',[req.params.roleid], (err,rows,fields) =>{
         
                if(!err){
                    res.send('Deleted successfully!');
                }else{
                    console.log(err);
                }
             });
});

module.exports = router;