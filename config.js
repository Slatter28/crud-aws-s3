require('dotenv').config()

const config = {
    aws:{
        bucket_name: process.env.AWS_BUCKET_NAME,
        bucket_region: process.env.AWS_BUCKET_REGION,
        secret_pay: process.env.AWS_SECRET_KEY,
        public_key: process.env.AWS_PUBLIC_KEY
    }

}

module.exports = config
