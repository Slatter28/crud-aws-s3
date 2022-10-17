const Router = require('express');
const { postUploadFile, Files, getFileUrl, downloadFileName } = require('../controllers/files');

const router = Router();

router.post('/',postUploadFile)


router.get('/', Files)

router.get('/:fileName',getFileUrl)

router.get('/downloadfile/:fileName',downloadFileName)

module.exports= router;