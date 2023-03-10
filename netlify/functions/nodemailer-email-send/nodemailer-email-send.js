const nodemailer = require('nodemailer')

exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
      },
      body: "Method not allowed"
    };
  }

  try {
    const {name,email,subject,details} = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
          user: `${process.env.CONTACT_EMAIL}`,
          pass: `${process.env.CONTACT_EMAIL_PASS}`
      }
    });
  
    const msgToOwner = {
      to: process.env.CONTACT_EMAIL,
      from: process.env.CONTACT_EMAIL,
      subject: `Message from contact form`,
      html: "<div>" + "<span>"+ "Name: " + name + "<span>" + "<br>" +
            "<span>"+ "Email: " + email + "<span>" + "<br>" +
            "<span>"+ "Subject: " + subject + "<span>" + "<br>" +
            "<span>"+ "Message: " + details + "<span>" + "<br>" +
            "</div>",
    };

    let infoForOwnerEmail = await transporter.sendMail(msgToOwner);
    if (infoForOwnerEmail.messageId){
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTION",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
        },
        body: JSON.stringify({
          msg: "Your message was sent. Thank you."
        })
      };
    }else{
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTION",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
        },
        body: JSON.stringify({
          msg: "Could not send your message. Please try again."
        })
      };
    }

  }
  catch(err) {
    console.log(err)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
      },
      body: JSON.stringify({
        msg: "Could not send your message. Please try again."
      })
    };
  }

};