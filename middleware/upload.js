// .env is going to contain the database url, eg the API key and the secret
require("dotenv").config() //This will import the env variables and put them in a format that the API recognizes
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config(); //This will configure everything using what was loaded from the .env file. This will load things up with the API key etc

const upload = multer ({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "Good Catch" //This is the name of the folder on the cloudinary cloud. Name it whatever you like
        }
    })
})

module.exports = upload;