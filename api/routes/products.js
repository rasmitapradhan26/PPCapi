const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {

    res.status(200).json({
        message:'Handling get it works!'
     });
});


router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    if (id === 'special'){
        res.status(200).json({
            message:'You discoverd a special id!!',
            id : id
         });
    }else{
        res.status(200).json({
            message:'id get it works!'
         });
    }
   
});

router.patch('/:id', (req,res,next) => {

    res.status(200).json({
        message:'Updated post it works!'
     });
});

router.delete('/:id', (req,res,next) => {

    res.status(200).json({
        message:'Delete post it works!'
     });
});

// //Get all active roles 
// router.get('/roles/:roleid', (req,res,next) => {
//     const roleid = req.params.roleid;
//     mysql.query('select * from role_master_table where Status = 1', (err,rows,fields) =>{
           
//                 if(roleid === 'Active'){
//                     res.send(rows);
//                 }else{
//                     console.log(err);
//                 }
//              });

// });

module.exports = router;