const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const bodyparser=require('body-parser');


const productRoutes = require('./api/routes/products');
const rolemasterRoutes = require('./api/routes/rolesmaster');
const usermasterRoutes = require('./api/routes/usermaster');
const roleassignmentRoutes = require('./api/routes/roleassignment');
const skumasterRoutes = require('./api/routes/skumaster');
const nodemasterRoutes = require('./api/routes/nodemaster');
const categorymasterRoutes = require('./api/routes/categorymaster');
const rawmaterialmasterRoutes = require('./api/routes/rawmaterialmaster');
const forcastmasterRoutes = require('./api/routes/forecastmaster');
const skucategorymapRoutes = require('./api/routes/skucategorymapping');
const skunodemapRoutes = require('./api/routes/skunodemapping');
const buffernermRoutes = require('./api/routes/buffernormmaster');
const additionalindentRoutes = require('./api/routes/additionalindentmaster');
const summaryreportRoutes = require('./api/routes/summaryreport');
const userloginRoutes = require('./api/routes/Loginctrl');
const uploadexcelRoutes = require('./api/routes/uploadexcel');
const uploadskuexcelRoutes = require('./api/routes/uploadskuexcel');
const uploadcatexcelRoutes = require('./api/routes/uploadcatexcel');
const uploadskucatexcelRoutes = require('./api/routes/uploadskucat');
const repleexceluploadRoutes = require('./api/routes/replenishmentexcel');
const generateotpRoutes = require('./api/routes/generateOTP');
const UploadbufferRoutes = require('./api/routes/uploadbuffernorm');
const UploadTransactionRoutes = require('./api/routes/transactionfileupload');
const quarterlyreportRoutes = require('./api/routes/Quarterlyreport');



// app.use((req,res,next) => {
//     res.status(200).json({
//         message:'it works!'
//     });
// });


app.use(cors())
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.use(function(req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoraization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Content-type", "application/json");
    // res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE, GET');
        return RES.status(200).json({});
    }
    next();
  });

app.use('/api/products' , productRoutes);
app.use('/api/rolesmaster' , rolemasterRoutes);
app.use('/api/usermaster' , usermasterRoutes);
app.use('/api/roleassignment' , roleassignmentRoutes);
app.use('/api/skumaster' , skumasterRoutes);
app.use('/api/nodemaster', nodemasterRoutes);
app.use('/api/categorymaster', categorymasterRoutes);
app.use('/api/rawmaterialmaster', rawmaterialmasterRoutes);
app.use('/api/forecastmaster', forcastmasterRoutes);
app.use('/api/skucategorymapping', skucategorymapRoutes);
app.use('/api/skunodemapping', skunodemapRoutes);
app.use('/api/buffernormmaster', buffernermRoutes);
app.use('/api/additionalindentmaster',additionalindentRoutes);
app.use('/api/summaryreport' , summaryreportRoutes);
app.use('/api/Loginctrl' , userloginRoutes);
app.use('/api/uploadexcel', uploadexcelRoutes);
app.use('/api/uploadskuexcel', uploadskuexcelRoutes);
app.use('/api/uploadcatexcel', uploadcatexcelRoutes);
app.use('/api/uploadskucat', uploadskucatexcelRoutes);
app.use('/api/replenishmentexcel',repleexceluploadRoutes);
app.use('/api/generateOTP',generateotpRoutes);
app.use('/api/uploadbuffernorm',UploadbufferRoutes);
app.use('/api/transactionfile',UploadTransactionRoutes);
app.use('/api/quarterlyRpt', quarterlyreportRoutes);


app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
    
});
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
                
      });
    
});


module.exports = app;