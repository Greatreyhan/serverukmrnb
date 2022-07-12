const cloudinary = require('cloudinary')
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

exports.upload = (file, folder) =>{
    return new Promise(resolve =>{
        cloudinary.uploader.upload(file, (res) =>{
            resolve({
                url: res.url,
                id: res.public_id
            })
        },{
            resource_type: "auto",
            folder : folder
        })
    })
}

exports.delete = (id) =>{
    return new Promise(resolve =>{
        cloudinary.uploader.destroy(id, res=>{
            resolve({
                status : 'success'
            })
        })
    })
}