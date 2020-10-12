import "./env";

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};


export const sendMail = email => {
    const options = {
        auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN
        }
    }
    const nodemailerMailgun = nodemailer.createTransport(mg(options));

    return nodemailerMailgun.sendMail(email, (err, info) => {
        if(err) {
            console.log(`Error: ${err}`)
        } else {
            console.log(`Response: ${info}`)
        }
    })
};



export const sendSecretMail = (address, secret) => {
    const email = {
        from: "penny@prismagram.com",
        to: address,
        subject: "Login Secret for Prismagram🐰",
        html: `Hello! 너의 로그인 비밀은 <strong>${secret}</strong> 임. <br />
             이걸 복사해서 붙여넣으면 너의 앱/웹사이트에 로그인할 수 있지`
    }
    return sendMail(email)
};



export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET );
