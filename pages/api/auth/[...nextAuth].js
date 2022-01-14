import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpiresAt: Date.now() + refreshedToken.expires_in * 1000, // convert 1 hour to 3600 miliseconds
      refreshToken: refreshedToken.refresh_token?? token.refreshToken,
    }

  } catch(error){
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        authorization: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async jwt({ token, account, user}) {
        //INITIAL SIGN IN
        if ( account && user) {
          console.log("account and user")
          return{
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account.expires_at * 1000,
          }
        }
        //Return previous token if it not expired
        if (Date.now() < token.accessTokenExpires) {
          console.log("existing token is valid")
          return token
        }
        //Refresh token if it expired
        console.log("refreshing token")
        return await refreshAccessToken(token)
      },
      async session({ session,token}){
        console.log("session")
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username

        return session
      }
    },
})