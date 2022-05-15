const { config } = require('dotenv')
const mailer = require('nodemailer')

module.exports = {
    async sendEmailTimbangan(payload) {
        const config = {
            port: process.env.PORT_EMAIL || 2525,
            host: process.env.HOST_EMAIL || 'smtp.mailtrap.io',
            auth: {
                user: process.env.USER_EMAIL || '13c6ecc7b1a8d7',
                pass: process.env.PASSWORD_EMAIL || 'cc16c5c90dad8b'
            }
        }

        const transporter = mailer.createTransport(config)
        const mailOptions = {
            to: payload.email,
            from: 'admin@timbanganiot.com',
            subject: 'Hasil Timbangan',
            html: `
            Data berhasil direcord berikut merupakan detail dari setiap hasil timbang:
            <br><br>
            <br>Nama    : ${payload.name}         
            <br>Berat   : ${payload.load} KG
            <br>Jam/Tanggal : ${payload.date}
            <br><br>
            Pesan dikirim otomatis oleh sistem
            <br>
            *ket data ini tidak dapat diubah dari hasil timbangan secara real time
            `
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