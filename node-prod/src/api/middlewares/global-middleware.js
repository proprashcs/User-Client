import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import passport from 'passport';
import { configureJWTStrategy } from './passport-jwt';
const swaggerDocument = require('../../config/swagger.json');


export const setGlobalMiddleware = app => {
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cors())
    app.use(logger('dev', {
        skip: function (req, res) {
            return res.statusCode == 404
        }
    }));
    app.use(passport.initialize());
    configureJWTStrategy();
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
          explorer: true,
        })
      );
}