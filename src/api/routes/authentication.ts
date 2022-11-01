import { Router } from "express";
import passport from "passport";

const route = Router();

export default (app: Router) => {
    app.use(route);

    route.get(
        '/google',
        passport.authenticate('google', {
            scope: ['email', 'profile']
        })
    )
    route.get(
        '/oauth2/redirect/google',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/user-info')
        }
    )

    route.get(
        '/user-info',
        (req, res) => {
            if(!req.user) res.redirect('/google')
            res.json(req.user)
        }
    )

    route.get(
        '/logout',
        (req, res, next) => {
            req.logOut((err) => {
                if (err) { return next(err) }
                console.log('logout started')
                res.redirect('/google')
            })

        }
    )
}
