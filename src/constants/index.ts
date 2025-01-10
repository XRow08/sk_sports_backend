import 'dotenv/config';
export const JWT_PRIVATE_KEY = process.env.TOKEN_SECRET;
export const API_META = "https://api.mit-tech.com.br:5112/api/v1"

export const configOAuth = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: JWT_PRIVATE_KEY,
  tokenExpiration: 36000,
  postUrl: 'https://jsonplaceholder.typicode.com/posts',
};

export const authParams = new URLSearchParams({
  client_id: configOAuth.clientId,
  redirect_uri: configOAuth.redirectUrl,
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline',
  state: 'standard_oauth',
  prompt: 'consent',
}).toString();
