import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderData } = req.body;

    // Create a transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can use other services (like SendGrid, SES) here
      auth: {
        user: "faydekidukaan@gmail.com",  // Email ID
        pass: "dgwcrpvuzewcrabl",  // Email Password (or app password)
      },
    });

    // HTML email template
    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: orderData.email,         // receiver's email
      subject: `Order Confirmation - ${orderData.orderId}`, // Subject line
      html: `
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #1a202c;
            text-align: center;
          }
          .order-details {
            margin-top: 20px;
          }
          .order-details p {
            font-size: 16px;
            line-height: 1.5;
          }
          .product-list {
            margin-top: 10px;
            border-top: 1px solid #e1e1e1;
            padding-top: 10px;
          }
          .product-list ul {
            list-style: none;
            padding: 0;
          }
          .product-list li {
            background-color: #fafafa;
            padding: 10px;
            border: 1px solid #e1e1e1;
            margin-bottom: 8px;
            border-radius: 4px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #888;
          }
          .footer a {
            color: #1a202c;
            text-decoration: none;
          }
          .contact {
            margin-top: 20px;
            padding: 10px;
            background-color: #f1f1f1;
            border-radius: 5px;
            text-align: center;
            font-size: 14px;
            color: #333;
          }
          .best-regards {
            margin-top: 20px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
        </style>
        <div class="container">
          <h1>Order Confirmation</h1>
          <p>Hi ${orderData.name},</p>
          <p>Thank you for your order! We're excited to get started with your order.</p>
          
          <div class="order-details">
            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
            <p><strong>Status:</strong> ${orderData.orderstatus}</p>
            <p><strong>Delivery Address:</strong> ${orderData.address}, ${orderData.pincode}</p>
            <p><strong>Phone Number:</strong> ${orderData.Mobilenumber}</p>
            <p><strong>Total Amount:</strong> ${orderData.subtotal}</p>
          </div>

          <div class="product-list">
            <h3>Products:</h3>
            <ul>
              ${orderData.Products.map(product => `
                <li>
                  <strong>${product.name}</strong><br>
                  <span>Price: ${product.price} | Quantity: ${product.quantity}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, feel free to contact us at <strong>+91 9807678581</strong> or email <strong>faydekidukaan@gmail.com</strong>.</p>
          </div>

          <div class="contact">
            <p>For further inquiries, please don't hesitate to reach out. We're here to help!</p>
            <p>Thank you once again for choosing us!</p>
          </div>

          <div class="best-regards">
            <p>Best regards,</p>
            <p>Fayde ki dukan</p>
          </div>
        </div>
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    // If the request is not POST
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
