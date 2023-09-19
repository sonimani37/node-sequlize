const express = require('express');
const cors = require('cors')
var logger = require('morgan');
const router = require('./routes/index-route');

const app = express();     
 
app.use(express.json());    

app.use(cors())

app.use(logger('dev'));

app.use('/api', router);

app.listen(7000, (req,resp) => {
    console.log('server running');
})
