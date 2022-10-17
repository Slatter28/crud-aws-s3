const { uploadFile, getFiles, getFileURL, downloadFile } = require("../helpers/s3");


const postUploadFile = async (req,res)=>{
    const result = await uploadFile(req.files.file);
    res.status(200).json({result})
}

const Files = async (req, res) => {
    const result = await getFiles()
    res.json(result.Contents)
}

const getFileUrl= async (req, res) => {
    const result = await getFileURL(req.params.fileName)
    res.json({
        url: result
    })
}

const downloadFileName =  async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({message: "archivo descargado"})
}

module.exports={
    postUploadFile,
    Files,
    getFileUrl,
    downloadFileName
}