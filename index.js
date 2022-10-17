const express = require('express');
const fileUpload = require('express-fileupload')
const {uploadFile, getFiles, getFileURL, downloadFile}= require('./s3')


const app = express();


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir : './uploads'
}));


app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to server'})
})

app.post('/files',async (req,res)=>{
    const result = await uploadFile(req.files.file);
    res.status(200).json({result})
})


app.get('/files', async (req, res) => {
    const result = await getFiles()
    res.json(result.Contents)
})

app.get('/files/:fileName', async (req, res) => {
    const result = await getFileURL(req.params.fileName)
    res.json({
        url: result
    })
})

app.get('/downloadfile/:fileName', async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({message: "archivo descargado"})
})



app.use(express.static('images'))


app.listen(8080,()=>{
    console.log('server on ')
})