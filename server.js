const dotenv = require('dotenv');
const app = require('./app.js')

dotenv.config({
    path:`${__dirname}/.env`
})





const port =  5000;
app.listen(port,()=>{
    console.log('s')
})
