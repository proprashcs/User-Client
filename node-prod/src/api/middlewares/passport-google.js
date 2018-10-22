// var passport = require('passport');
import passport from 'passport';
// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
import GoogleStrategy from 'passport-google-oauth';
import { devConfig } from '../../config/env/development';

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy.OAuth2Strategy({
    consumerKey: devConfig.google.clientId,
    consumerSecret: devConfig.google.clientSecret,
    callbackURL:  devConfig.google.callbackURL,
  },
  function(token, tokenSecret, profile, done) {
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    //   });

    console.log('token', token);
    console.log('tokenSecret', tokenSecret);
    console.log('profile', profile);
    done(null, profile);

    
  }
));