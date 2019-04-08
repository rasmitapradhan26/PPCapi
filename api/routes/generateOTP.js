const express = require('express');
const router = express.Router();
var mysql = require('../connector/db');
var nodemailer = require('nodemailer');
//Get SummeryReport
router.get('/Sendotp/:username', (req,res,next) => {
   
    mysql.query('select  um.User_ID, um.Name,um.Email,um.RoleID,um.PhoneNo,um.SecurityCode  from user_master_table um  where um.Status=1 and um.Email = ? ',[req.params.username], (err,rows,fields) =>{
           
                if(!err){
                    // res.send(rows);
                    var userdtls=Object.values(JSON.parse(JSON.stringify(rows)));                   
                    for (var i = 0; i < userdtls.length; i++) {
                        console.log(userdtls[0].Email);
                        var securitycode=Math.floor(100000 + Math.random() * 900000)
                        console.log(securitycode);
                        let data = [securitycode,userdtls[0].Email];
                        
                        mysql.query('UPDATE  user_master_table  SET SecurityCode = ? where Email = ?',data, (err,rows1,fields) =>{
           
                            if(!err){
                                //res.write(rows1);
                                console.log('suucecss');
var mailbody='There is a password change notification for your VolvoCRM account. \n\n The one time password for password change is ' + securitycode + ' Please do not share the OTP \
             with anyone else.\n\n This OTP can be used only once and only for password change.\n\n';
           
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                      user: 'bkmistcopia@gmail.com',
                                      pass: 'svexkusscvpmtcyp'
                                    }
                                  });
                                  var mailOptions = {
                                    from: 'bkmistcopia@gmail.com',
                                    to: 'rasmita2k6@gmail.com',
                                    subject: 'OTP for your password change at PPC',
                                    text: mailbody
                                  };
                                  
                                  transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                      
                                    } else {
                                      console.log('Email sent: ' + info.response);
                                      //res.send('Email Sent');
                                      //res.send(JSON.stringify('Email Sent'));
                                      mysql.query('select  um.User_ID, um.Name,um.Email,um.PhoneNo,um.SecurityCode  from user_master_table um  where um.Status=1 and um.Email = ? ',[userdtls[0].Email], (err,rows1,fields) =>{
                                        if(!err){

                                            res.send(rows1);

                                        }else{

                                        }
                                      
                                      });
                                     
                                    }
                                  });

                            }else{
                                console.log(err);
                               // res.send(JSON.stringify('not update'));
                            }
                         });     

                      }
                }else{
                    console.log(err);
                  //  res.send(JSON.stringify('invalid email'));
                    //res.json({error_code:0,err_desc:null});
                }
             });

});

router.get('/ChangePwd/:UserID/:NewPwd/:SecurityCode', (req,res,next) => {
    
    let data = [req.params.NewPwd,req.params.UserID,req.params.SecurityCode];
    mysql.query('UPDATE  user_master_table  SET Password=? where User_ID = ? and SecurityCode = ?',data, (err,rows1,fields) =>{
        if(!err){
            var mailbody='Your passowrd to PPC is Successfully Changed. \n\n';
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'bkmistcopia@gmail.com',
                  pass: 'svexkusscvpmtcyp'
                }
              });
              var mailOptions = {
                from: 'bkmistcopia@gmail.com',
                to: 'rasmita2k6@gmail.com',
                subject: 'Successfully password change at PPC',
                text: mailbody
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  
                } else {
                  console.log('Email sent: ' + info.response);
                  res.send(JSON.stringify('1'));
                 
                }
              });
           

        }else{
            console.log(err);
        }

    });
 
});

module.exports = router;