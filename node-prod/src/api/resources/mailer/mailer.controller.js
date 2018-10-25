import mailerService from "./mailer.service";
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND
} from "http-status-codes";
import nodemailer from 'nodemailer';

export default {

    async sendMailer(req, res) {
        try {

            const {
                value,
                error
            } = mailerService.validateMaiilerSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error);
            }
//  return res.json(value);
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'prashant.shukla@gmail.com',
                    pass: 'password'
                }
            });

            var mailOptions = {
                // from:"prashant.shukla@digispice.com",
                to: value.to,
                subject: value.subject,
                text: value.content,
                html: '<p>Hi '+value.name+', </p>'+
                '<p>I would like to inform that you are awesome!!! </p>'+
                '<p>'+value.content+'</p>'+
                '<p>Thanks,</p>'+
                '<p> Development Team </p>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // console.log(error);
                    return res.status(BAD_REQUEST).json(error);
                } else {
                    // console.log('Message Sent: '+info.response);
                    return res.json({
                        success: true,
                        message: "Mail Send Successfully"
                    });
                }
            });

            // return res.json(value);
            // const client = await Client.create(value);
            // return res.json(client);
        } catch (err) {
            return res.status(INTERNAL_SERVER_ERROR).json(err);

        }
    }


}