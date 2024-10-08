import { google } from "googleapis";
import { cookies } from "next/headers";

export async function GET(req) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return new Response(JSON.stringify({ msg: 'No code provided' }), { status: 400 });
  }

  try {
    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();


    // Store the token in a cookie
    const cookieStore = cookies();
    
    // (name, value, options)
    cookieStore.set('google_tokens', JSON.stringify(tokens), { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 }) 
    cookieStore.set('user_email', userInfo.data.email, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })

    // Determine redirect based on state
    let redirectUrl = '/instructor/dashboard';
    if (state !== 'instructor') {
      redirectUrl = '/'; // Default home page fallback
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: `${redirectUrl}?msg=Login%20Successful`,
      },
    });
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return new Response(JSON.stringify({ msg: 'Authentication failed' }), { status: 500 });
  }
}