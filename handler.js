var nodemailer = require('nodemailer');

module.exports = {
    sendMail: function(mail, query) {
        var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
              user: 'bhavikkpateld@yahoo.com',
              pass: "qfgrqybggqfozobv"
            }
          });
          
          var mailOptions = {
            from: 'bhavikkpateld@yahoo.com',
            to: mail,
            subject: 'Reg. your visit to New Saraswathi Saw Mill',
            text: query
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}