import { expressjwt } from 'express-jwt';

export default function JWTValidator() {
    if (!process.env.JWT_SECRET) {
        throw 'JWT_SECRET not defined'
    }

    return expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256']});
}
