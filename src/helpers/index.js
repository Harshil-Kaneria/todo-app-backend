import { getReasonPhrase } from "http-status-codes";
const { uuid } = require('unique-string-generator');
const nodemailer = require("nodemailer");

export const generateResponse = (req, res,status_code,status,message='',data) => {
  message = message===''?getReasonPhrase(status_code):message

  const response = {
    status,
    message,
    ...data,
  };

  res.status(status_code).json(response);
};

export const  upload_file = async function(req, res, next,file_name="",directory_name=""){
  if(req.files[`${file_name}`]){
      var file = req.files[`${file_name}`]
      var filename = uuid()+"_"+(file.name).replace(/\s/g, "")

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

export const send_mail = async function(to="",subject="",html=""){
  try{
    
    if(to=="" || subject=="" || html=="") return false
    
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  
    const info = await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: to,
      subject:subject,
      html: html,
    });

    return true

  }catch(err){
    return false
  }

}