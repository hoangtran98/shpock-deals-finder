import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "finest.supplements.no1@gmail.com",
    pass: "Hoanghp98",
  },
});

function renderData(data) {
  const listingsData = data.map(({ title, price, url }) => {
    return `
      <h3>${title}</h3>
      <ul>
        <li>${price}</li>

        <li>URL: ${url}</li>
      </ul>
    `;
  });
  const listingsStringData = listingsData.toString();
  if (listingsStringData) {
    return listingsStringData.replace(/,/g, "");
  }
  return;
}

function sendEmail(data: string[], platform: string) {
  if (!data.length || !data) {
    throw new Error("There is no new data to email");
  }

  const mailOptions = {
    from: "finest.supplements.no1@gmail.com",
    to: "hoang.huy.tran0308@gmail.com",
    subject: `[${platform}]iPhone Listings Update`,
    html: `<p>Hey Hoang,</p>
    <br>
    <h2>New iPhone ${platform} Listings:</h2>
    <br>
    ${renderData(data)}
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      const currentDate = new Date();
      console.log("Email is sent successfully at", currentDate.toString());
    }
  });
}

module.exports = sendEmail;
