const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {

  const headers = {
    'Access-Control-Allow-Origin': https://webcrafter.in/,
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }



  try {
    console.log(event.body)
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
        headers,
        body: JSON.stringify({ message: `Your message was sent. Thank you` })
      };
  
    
    }else{
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Could not send email please try again' })
      };
    
    }

  }
  catch(err) {
    console.log(err)
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Something went wrong...' })
    };
  }

};
