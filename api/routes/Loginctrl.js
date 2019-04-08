const express = require('express');
const router = express.Router();
var mysql = require('../connector/db')


//Get SummeryReport
router.get('/ValidUser/:userid/:pwd', (req,res,next) => {
   
    mysql.query('select  um.User_ID, um.Name,um.Email,um.Password,um.RoleID,rm.RoleName,um.PhoneNo  from user_master_table um \
    left join role_master_table rm on um.RoleID=rm.RoleID  where um.Email = ? and um.Password= ?',[req.params.userid,req.params.pwd], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


//Get firstlevel menu
router.get('/FirstLevelmenu/:RoleId', (req,res,next) => {
   
    mysql.query('SELECT ur.RoleID,ur.MainModuleID,mt.parentmenu_name  FROM user_role_assignment_table ur left join mainmenu_table mt on mt.idmainMenu=ur.MainModuleID \
    where ur.IsWeb=1 and ur.RoleID = ? group by  ur.RoleID,ur.MainModuleID,mt.parentmenu_name   ',[req.params.RoleId], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});

//Get secondlevel menu
router.get('/SecondLevelmenu/:RoleId/:MainMenuId', (req,res,next) => {
   
    mysql.query('SELECT ur.RoleID,ur.MainModuleID,mt.parentmenu_name,ur.secondMenuId,st.childmenu_name    FROM user_role_assignment_table ur  left join secondlabelmenu_table st on st.idsecondlabelmenu=ur.secondMenuId \
    left join mainmenu_table mt on mt.idmainMenu=ur.MainModuleID    where ur.IsWeb=1 and  ur.RoleID = ?  and ur.MainModuleID=? ',[req.params.RoleId,req.params.MainMenuId], (err,rows,fields) =>{
           
                if(!err){
                    res.send(rows);
                }else{
                    console.log(err);
                }
             });

});


module.exports = router;