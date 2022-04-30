const { config } = require('dotenv')
const mailer = require('nodemailer')

module.exports = {
    async sendEmailTimbangan(payload) {
        const config = {
            port: 2525,
            host: 'smtp.mailtrap.io',
            auth: {
                user: '13c6ecc7b1a8d7',
                pass: 'cc16c5c90dad8b'
            }
        }

        const transporter = mailer.createTransport(config)
        const mailOptions = {
            to: payload.email,
            from: 'setyawandicky1610@gmail.com',
            subject: 'testing',
            html: `<h4>Berat timbangan adalah ${tandaPemisahTitik(payload.load)} KG, Ditimbang pada ${payload.date}</h4>`
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        })
    }
}

function tandaPemisahTitik(b){
    var _minus = false;
    if (b<0) _minus = true;
    b = b.toString();
    b=b.replace(".","");
    b=b.replace("-","");
    c = "";
    panjang = b.length;
    j = 0;
    for (i = panjang; i > 0; i--){
    j = j + 1;
    if (((j % 3) == 1) && (j != 1)){
    c = b.substr(i-1,1) + "." + c;
    } else {
    c = b.substr(i-1,1) + c;
    }
    }
    if (_minus) c = "-" + c ;
    return c;
    }

// const transporter = mailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'setyawandicky1610@gmail.com',
//         pass: 'dicky161098'
//     }
// })

// var mailOptions = {
//     from: 'setyawandicky610@gmail.com',
//     to: 'stayawandicky88@gmail.com',
//     subject: 'send email',
//     Text: 'oke eas!'
// }

// transporter.sendMail(mailOptions, (err, info) => {
//     if(err) throw err
//     console.log("Email sent : " + info.response)
// })