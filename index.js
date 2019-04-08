

// const express=require('express');

// var app=express();
// const bodyparser=require('body-parser');

// app.use(bodyparser.json());



// app.listen(3000,()=>console.log('Express server running at port:3000'));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// //Get all Roles
// app.get('/api/roles', function (req, res) {
//     debugger;
//     con.query('select * from role_master_table',(err,rows,fields) =>{ //function (error, results, fields) {
//         if(!err){
//             res.send(rows);
//         }else{
//             console.log(err);
//         }
//      });
//  });
// //get roles by id
//  app.get('/roles/:id', function (req, res) {
//     con.query('select * from role_master_table where RoleID = ?',[req.params.id], (err,rows,fields) =>{
//     //    if (error) throw error;
//     //    res.end(JSON.stringify(results));
//         if(!err){
//             res.send(rows);
//         }else{
//             console.log(err);
//         }
//      });
//  });

//  //Delete roles by id
//  app.delete('/roles/:id', function (req, res) {
//     con.query('Delete from role_master_table where RoleID = ?',[req.params.id], (err,rows,fields) =>{
//     //    if (error) throw error;
//     //    res.end(JSON.stringify(results));
//         if(!err){
//             res.send('Deleted successfully!');
//         }else{
//             console.log(err);
//         }
//      });
//  });

//   //insert roles by id
//   app.post('/roles', function (req, res) {
//       let role=req.body;
//       var sql="SET @RoleID = ?;SET @RoleName = ?;SET @Description = ?; \
//       CALL RoleMasterAddOrEdit(@RoleID,@RoleName,@Description);";
//     con.query(sql,[role.RoleID,role.RoleName,role.Description], (err,rows,fields) =>{
   
//         if(!err){
//             rows.forEach(element => {
//                 if(element.constructor==Array){
//                     res.send('inserted RoleID:'+element[0].RoleID);
//                 }
//             });
           
//         }else{
//             console.log(err);
//         }
//      });
//  });

//  //Update roles by id
//  app.put('/roles', function (req, res) {
//     let role=req.body;
//     var sql="SET @RoleID = ?;SET @RoleName = ?;SET @Description = ?; \
//     CALL RoleMasterAddOrEdit(@RoleID,@RoleName,@Description);";
//   con.query(sql,[role.RoleID,role.RoleName,role.Description], (err,rows,fields) =>{
 
//       if(!err){
//         res.send('Updated successfully!');
         
//       }else{
//           console.log(err);
//       }
//    });
// });