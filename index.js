const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
dotenv.config()

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

async function sendMail() {
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user:'mzarzycki37@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            },
        })
        let mailOption = {
            from:  'mzarzycki37@gmail.com',
            to: 'michal.p.zarzycki@wp.pl',
            subject: "HI MIKE!",
            text: "How u doing?"
        }
     const result = await transporter.sendMail(mailOption, (err, data) => {
            if(err) {
                console.log('ERROR 📽', err)
            } else {
                console.log("MAIL SENDED 🔥" )
            }
        })
        return result
    } catch(err) {
        return err
    }
};

for(let i=0; i<10; i++) {
    sendMail()
}



