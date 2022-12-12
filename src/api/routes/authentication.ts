import { Usuario } from "@prisma/client";
import { Router } from "express";
import passport from "passport";
import authorize from "../../middleware/authorize";

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
        (_req, res) => {
            res.redirect('/oauth2/success')
        }
    )

    route.get(
        '/oauth2/success',
        (_req, res) => {
            res.send('<script>window.close()</script > ')
        }
    )

    route.get(
        '/user-info',
        (req, res) => {
            if(!req.user) res.status(401).end()
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
