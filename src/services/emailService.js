import nodemailer from "nodemailer";
import dotenv from "dotenv";
import productService from "./productService";

dotenv.config();

export const sendEmailCreateOrder = async (email, orderItems, total) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let listItem = "";

    for (const order of orderItems) {
      const product = await productService.getProductById(order?.product);
      listItem += `
    <tr>
      <td style="border: 1px solid #dddddd; padding: 8px;"><b>${product.title}</b></td>
      <td style="border: 1px solid #dddddd; padding: 8px;"><img src="${product.thumbnail}" alt="Ảnh sản phẩm" style="width:100px"/></td>
      <td style="border: 1px solid #dddddd; padding: 8px;">${order.qty}</td>
    </tr>
  `;
    }

    const table = `
<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Tên Sản Phẩm</th>
      <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Ảnh</th>
      <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Số Lượng</th>
    </tr>
  </thead>
  <tbody>
    ${listItem}
  </tbody>
</table>
`;
    await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: "Bạn đã đặt hàng thành công tại shop HT",
      text: "Hello world?",
      html: `<div style="margin-bottom: 20px; text-align:center"><b>Cảm ơn bạn</b></div> ${table} 
      <div style="text-align:right; margin-top:20px; color:red">Tổng Tiền : ${Math.ceil(
        total
      ).toLocaleString("vi-VN")} VNĐ</div>`,
    });
  } catch (error) {
    console.log(error);
  }
};
