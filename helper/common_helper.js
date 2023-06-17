const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const axios = require('axios').default;

class common{

    // Return IpAddress of Request
    get_ip_address = async function(req, res, next){
        return req.ip
    }

    // Return Geolocation Data based on Ip Address
    get_geo_location = async function(req, res, next){
        // let ip = "42.106.35.104";
        let ip = req.ip;
        return axios.get(`http://ip-api.com/json/${ip}`).then(function (response) {
            return response.data;
        }).catch(function (error) {
            return error;
        })
    }

    // Upload File Upload Handler
    upload_file = async function(req, res, next,file_name="",directory_name=""){
        if(req.files[`${file_name}`]){
            var file = req.files[`${file_name}`]
            var filename = uuidv4()+"_"+file.name

            var dirname = './'+constants.UPLOAD_DIR;
            if(directory_name!=""){
                dirname = './'+constants.UPLOAD_DIR+"/"+directory_name
            }
            
            if (!fs.existsSync(dirname)){
                fs.mkdirSync(dirname, { recursive: true });
            }

            try {
                await file.mv(dirname+'/'+filename)
                return filename
            } catch (error) {
                console.log(error)
                return false
            }
        }else{
            return false
        }
    }

}

module.exports = new common