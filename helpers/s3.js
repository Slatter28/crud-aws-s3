const {S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const config = require('../config');
const fs = require('fs');
const{getSignedUrl} = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
    region: config.aws.bucket_region,
    credentials:{
        accessKeyId:config.aws.public_key,
        secretAccessKey:config.aws.secret_pay
    }
});


const  uploadFile = async(file)=>{
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadParams={
        Bucket: config.aws.bucket_name,
        Key: file.name,
        Body:stream
    }
    const command = new PutObjectCommand(uploadParams)

  return  await client.send(command)
}

const getFiles= async() =>{
    const command = new ListObjectsCommand({
        Bucket: config.aws.bucket_name
    })
    return await client.send(command)
}

const getFile = async(filename) =>{
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    return await client.send(command)
}

const downloadFile =async(filename) =>{
    const command = new GetObjectCommand({
        Bucket: config.aws.bucket_name,
        Key: filename
    })
    const result = await client.send(command)
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`))
}

const getFileURL=async(filename) =>{
    const command = new GetObjectCommand({
        Bucket: config.aws.bucket_name,
        Key: filename
    })
    return await getSignedUrl(client, command, { expiresIn: 3600 })
}

module.exports={
    uploadFile,
    getFiles,
    getFile,
    downloadFile,
    getFileURL
}