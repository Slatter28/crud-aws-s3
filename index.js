const express = require('express');
const fileUpload = require('express-fileupload')
const filesRoutes=require('./routes/files')

const app = express();


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir : './uploads'
}));


app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to server'})
})

app.use('/files',filesRoutes);

app.use(express.static('images'))


app.listen(8080,()=>{
    console.log('server on ')
})