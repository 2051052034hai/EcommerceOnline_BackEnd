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

export const sendEmailResetPassword = async (email) => {
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
    const generatedCode = Math.floor(100000 + Math.random() * 900000);

    console.log("generatedCode:", generatedCode);

    await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: "Khôi phục tài khoản",
      text: "Password?",
      html: `<div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; text-align: center;">Đặt lại mật khẩu</h2>
        <p style="color: #555; text-align: center;">Bạn đã yêu cầu đặt lại mật khẩu. Dưới đây là mã xác minh của bạn:</p>
        <div style="background-color: #007bff; color: #fff; text-align: center; font-size: 20px; padding: 5px; border-radius: 5px;">
          <span style="font-weight: bold;">${generatedCode}</span>
        </div>
        <p style="color: #555; text-align: center;">Vui lòng sử dụng mã này để đặt lại mật khẩu của bạn.</p>
        <p style="color: #555; text-align: center;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <p style="color: #555; text-align: center;">Xin cảm ơn!</p>
      </div>
    </div>
    `,
    });
    return generatedCode;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailRegisterUser = async (email, username) => {
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

    // Tạo đường link đăng ký
    const registerLink = `${
      process.env.FRONTEND_URL
    }/ConfirmRegister?email=${encodeURIComponent(
      email
    )}&username=${encodeURIComponent(username)}`;

    await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: "Xác nhận đăng ký tài khoản",
      html: `
      <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; text-align: center;">Xác nhận đăng ký tài khoản</h2>
          <p style="color: #555; text-align: center;">Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấp vào liên kết bên dưới để tiếp tục quá trình đăng ký:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${registerLink}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-size: 16px;">
              Xác nhận đăng ký
            </a>
          </div>
          <p style="color: #555; text-align: center;">Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
          <p style="color: #555; text-align: center;">Xin cảm ơn!</p>
        </div>
      </div>
      `,
    });

    return true; // Trả về true nếu email gửi thành công
  } catch (error) {
    console.log(error);
    return false; // Trả về false nếu có lỗi xảy ra
  }
};
