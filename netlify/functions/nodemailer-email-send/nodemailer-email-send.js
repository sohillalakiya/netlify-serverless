const nodemailer = require('nodemailer')

exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
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
          user: "sohillalakiya2306@gmail.com",
          pass: "zicibjkgnhrhgprm"
      }
    });
  
    
    // yzcodnzhgasmlhqo

    const msgToOwner = {
      to: "sohillalakiya2306@gmail.com",
      from: "sohillalakiya2306@gmail.com",
      subject: `Message from contact form`,
      html: "<div>" + "<span>"+ "Name: " + name + "<span>" + "<br>" +
            "<span>"+ "Email: " + email + "<span>" + "<br>" +
            "<span>"+ "Subject: " + subject + "<span>" + "<br>" +
            "<span>"+ "Message: " + details + "<span>" + "<br>" +
            "</div>",
    };
    
    // const msgToClient = {
    //   to: email,
    //   from: "sohillalakiya2306@gmail.com",
    //   subject: `Contact Abhishek Textile`,
    //   html: "<div>"+ "<h3>" + "Thank You " + name + "</h3>" +
    //         "<h4>" + "We Will Contact Back You Soon" + "</h4>" +
    //         "<span>"+ "Name: " + name + "<span>" + "<br>" +
    //         "<span>"+ "Email: " + email + "<span>" + "<br>" +
    //         "<span>"+ "Subject: " + subject + "<span>" + "<br>" +
    //         "<span>"+ "Message: " + details + "<span>" + "<br>"+ 
    //        "</div>"
    // };

    let infoForOwnerEmail = await transporter.sendMail(msgToOwner);
    // let infoForClientEmail = await transporter.sendMail(msgToClient);
    if (infoForOwnerEmail.messageId){
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: "Your message was sent. Thank you."
        })
      };
    }else{
      return {
        statusCode: 500,
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
      body: JSON.stringify({
        msg: "Could not send your message. Please try again."
      })
    };
  }

};