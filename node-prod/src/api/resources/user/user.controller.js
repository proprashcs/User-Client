import userService from "./user.service";
import jwt from "jsonwebtoken";
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNAUTHORIZED
} from "http-status-codes";

import User from "./user.model";
import bcryptjs from 'bcryptjs';
import { devConfig } from "../../../config/env/development";
export default {

    async signup(req, res) {
        try {
            //validate the request
            const {
                error,
                value
            } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error);
            }
            const user = await User.create(value);


            return res.json({
                success: true,
                message: "User created Successfully"
            });
        } catch (err) {
            console.error(err);

            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },
    async login(req, res) {
        try {
            //validate the request
            const {
                error,
                value
            } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error);
            }
            const user = await User.findOne({
                email: value.email
            });
            if (!user) {
                return res.status(BAD_REQUEST).json({
                    err: 'Invalid email or password'
                });
            }
            const matched = bcryptjs.compare(value.password, user.password);
            if (!matched) {
                return res.status(UNAUTHORIZED).json({
                    err: 'invalid credentials'
                });
            }
            const token = jwt.sign({id:user._id}, devConfig.secret, {expiresIn: '1d'});

            return res.json({success: true, token});

            // return res.json({
            //     success: true,
            //     message: "User logedin Successfully"
            // });
        } catch (err) {
            console.error(err);

            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }


    },
    async test(req, res){
        // console.log('omm');
        
        return res.json(req.user);
    }
}