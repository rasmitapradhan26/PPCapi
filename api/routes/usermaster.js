const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')




//Get all data from Usermaster
router.get('/', (req,res,next) => {
    debugger;
    mysql.query('select um.User_ID,um.EmployeeID,um.Password,um.Name,um.Email,um.PhoneNo,um.RoleID, um.Designations,um.Location, \
    um.Status,um.WhenEntered,um.WhenModified,um.StateId,um.DistrictId,um.FunctionalTeam,rm.RoleName, \
    dm.designation_name,fm.functionalName from user_master_table um \
    left join role_master_table rm on um.RoleID = rm.RoleID \
    left join designation_table dm on dm.designation_id = um.Designations \
    left join functional_table fm on fm.functional_id =um.FunctionalTeam',(err,rows,fields) =>{ 
                if(!err){
                   
                   
                     res.status(200).json(rows);
                  
                }else{
                    console.log(err);
                }
             });
  
});
//Get all active roles 
router.get('/roles/', (req,res,next) => {
   
    mysql.query('select * from role_master_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active designation 
router.get('/designation/', (req,res,next) => {
   
    mysql.query('select * from designation_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get all active functional 
router.get('/functional/', (req,res,next) => {
   
    mysql.query('select * from functional_table where Status = 1', (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});
//Get details of userid
router.get('/:userid', (req,res,next) => {
    const userid = req.params.userid;
    mysql.query('select * from user_master_table where User_ID = ?',[req.params.userid], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//insert into Usermaster

router.post('/', (req,res,next) => {
  
    let user=req.body;
          var mysqlvar="SET @UserID = ?;SET @EmployeeID = ?;SET @Password = ?;SET @Name=?;SET @Email=?;SET @PhoneNo=?;SET @RoleID=?;SET @DesignationID=?;SET @Location=?;SET @Status=?;SET @StateId=?;SET @DistrictId=?;SET @functionalID=?; \
          CALL UserMasterAddOrEdit(@UserID,@EmployeeID,@Password,@Name,@Email,@PhoneNo,@RoleID,@DesignationID,@Location,@Status,@StateId,@DistrictId,@functionalID);";
          mysql.query(mysqlvar,[user.UserID,user.EmployeeID,user.Password,user.Name,user.Email,user.PhoneNo,user.RoleID,user.DesignationID,user.Location,user.Status,user.StateId,user.DistrictId,user.functionalID], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});


//update Usermaster
router.put('/', (req,res,next) => {
  
    let user=req.body;
          var mysqlvar="SET @UserID = ?;SET @EmployeeID = ?;SET @Password = ?;SET @Name=?;SET @Email=?;SET @PhoneNo=?;SET @RoleID=?;SET @DesignationID=?;SET @Location=?;SET @Status=?;SET @StateId=?;SET @DistrictId=?;SET @functionalID=?; \
          CALL UserMasterAddOrEdit(@UserID,@EmployeeID,@Password,@Name,@Email,@PhoneNo,@RoleID,@DesignationID,@Location,@Status,@StateId,@DistrictId,@functionalID);";
          mysql.query(mysqlvar,[user.UserID,user.EmployeeID,user.Password,user.Name,user.Email,user.PhoneNo,user.RoleID,user.DesignationID,user.Location,user.Status,user.StateId,user.DistrictId,user.functionalID], (err,rows,fields) =>{
            if(!err){
                res.send(rows);
                 
              }else{
                  console.log(err);
              }
            
         });
});

//Delete record on Userid
router.delete('/:userid', (req,res,next) => {

    mysql.query('Delete from user_master_table where User_ID = ?',[req.params.roleid], (err,rows,fields) =>{
         
                if(!err){
                    res.send('Deleted successfully!');
                }else{
                    console.log(err);
                }
             });
});

module.exports = router;