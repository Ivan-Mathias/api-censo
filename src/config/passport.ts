import passport from "passport"
import passportGoogle from 'passport-google-oauth20'
import prismaClient from "./prisma"
const GoogleStrategy = passportGoogle.Strategy

if(process.env.GOOGLE_CLIENT_ID === undefined ||
  process.env.GOOGLE_CLIENT_SECRET === undefined ||
  process.env.GOOGLE_CALLBACK_URL === undefined) {
    console.error('Google api secrets not defined.')
    process.exit(1)
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const user = await prismaClient.usuario.findFirst({
        where: {
          googleId: profile.id
        }
      })

      if(!user) {
        const displayName = profile.displayName.split(' ')

        const newUser = await prismaClient.usuario.upsert({
          where: {
            email: profile.emails![0].value
          },
          update: {
            googleId: profile.id,
            nome: profile.name?.givenName || displayName[0],
            sobrenome: profile.name?.familyName || displayName.length > 1 ? displayName[displayName.length - 1] : undefined,
          },
          create: {
            googleId: profile.id,
            nome: profile.name?.givenName || displayName[0],
            sobrenome: profile.name?.familyName || displayName.length > 1 ? displayName[displayName.length - 1] : undefined,
            email: profile.emails?.[0].value || ''
          }
        })

        if(newUser) done(null, newUser)
      } else done(null, user)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async(id: number, done) => {
  const user = await prismaClient.usuario.findUnique({
    where: { id }
  })

  done(null, user)
})
