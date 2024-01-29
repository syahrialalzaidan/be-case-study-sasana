import nodemailer from "nodemailer";
import { Users } from "@prisma/client";

interface Message {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}

function sendEmail(message: Message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 25,
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
}

export const sendVerificationEmail = (
  email: string,
  otp: string,
  registerToken: string
) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: email,
    subject: "Sasana Digital - Email Verification",
    html: `
        <h3>Dear ${email},</h3>

        <p>We hope this message finds you well. We wanted to inform you that a verification request has been initiated for your Sasana account.</p>

        <p>To ensure the security of your account, please follow the link below and enter the code to verify your email:</p>

        <ol>
            <li>Link: <a target="_" href="${process.env.NEXT_PUBLIC_WEB_URL}/signup/verification?token=${registerToken}">Verify Email Link</a></li>
        </ol>

        <strong>OTP Code: ${otp}</strong>

        <p>If you did not request a verification or believe this email was sent in error, please contact our support team immediately for assistance.</p>

        <p>Thank you for choosing Sasana. We value your security and are here to assist you with any concerns you may have.</p>

        <p>Best regards,</p>
        <p>The Sasana Team</p>
      `,
  };

  return sendEmail(message);
};

export const sendResetPasswordEmail = ({
  toUser,
  token,
}: {
  toUser: Users;
  token: string;
}) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "Klugee - Password Reset Request",
    html: `
        <h3>Dear ${toUser.email},</h3>

        <p>We hope this message finds you well. We wanted to inform you that a password reset request has been initiated for your Klugee account.</p>

        <p>To ensure the security of your account, please follow the instructions below to reset your password:</p>

        <ol>
            <li>Click on the following link: <a target="_" href="${process.env.NEXT_PUBLIC_WEB_URL}/newpassword?token=${token}">Reset Password Link</a></li>
            <li>Once you've clicked the link, you will be directed to a secure page where you can set a new password for your account.</li>
            <li>For security reasons, this password reset link will expire in 30 minutes, so please act promptly.</li>
        </ol>

        <p>If you did not request a password reset or believe this email was sent in error, please contact our support team immediately for assistance.</p>

        <p>Thank you for choosing Klugee. We value your security and are here to assist you with any concerns you may have.</p>

        <p>Best regards,</p>
        <p>The Klugee Team</p>
      `,
  };

  return sendEmail(message);
};

export const sendLoginVerification = (
  email: string,
  otp: string,
) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: email,
    subject: "Sasana Digital - Login Verification",
    html: `
        <h3>Dear ${email},</h3>

        <p>We hope this message finds you well. We wanted to inform you that a verification request has been initiated for your Sasana account.</p>

        <p>To ensure the security of your account, please enter the code to log in:</p>

        <strong>OTP Code: ${otp}</strong>

        <p>If you did not request a verification or believe this email was sent in error, please contact our support team immediately for assistance.</p>

        <p>Thank you for choosing Sasana. We value your security and are here to assist you with any concerns you may have.</p>

        <p>Best regards,</p>
        <p>The Sasana Team</p>
      `,
  };

  return sendEmail(message);
};


export const sendForgotPassword = (
  email: string,
  otp: string,
) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: email,
    subject: "Sasana Digital - Forgot Password",
    html: `
        <h3>Dear ${email},</h3>

        <p>We hope this message finds you well. We wanted to inform you that a verification request has been initiated for your Sasana account.</p>
        <p>To recover your password, please follow the link below:</p>
        <p><a target="_" href="${process.env.NEXT_PUBLIC_WEB_URL}/forgotpassword/new?token=${otp}">Reset Password Link</a></p>


        <p>If you did not request a verification or believe this email was sent in error, please contact our support team immediately for assistance.</p>

        <p>Thank you for choosing Sasana. We value your security and are here to assist you with any concerns you may have.</p>

        <p>Best regards,</p>
        <p>The Sasana Team</p>
      `,
  };

  return sendEmail(message);
};
