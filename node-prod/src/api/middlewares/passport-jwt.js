// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
import PassporJWT from 'passport-jwt';
import {
    devConfig
} from '../../config/env/development';
import User from '../resources/user/user.model';
import passport from 'passport'; 

export const configureJWTStrategy  = () =>{
const opts = {};
opts.jwtFromRequest = PassporJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = devConfig.secret;

// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new PassporJWT.Strategy(opts, function (payload, done) {
    User.findOne({
        _id: payload.id
    }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}