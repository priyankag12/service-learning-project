import { google } from 'googleapis';
import { v4 as uuid } from 'uuid';
import { cookies } from 'next/headers';

export async function GET() {
  return new Response(JSON.stringify({ msg: 'Please use POST to schedule an event' }), { status: 405 });
}

export async function POST(req) {
  try {
    const cookieStore = cookies();

    // Get the value of the token passed in the redirect route by using its name "google_tokens"
    const tokenCookie = cookieStore.get('google_tokens');
    const userEmail = cookieStore.get('user_email')
    
    if (!tokenCookie || !userEmail) {
      return new Response(JSON.stringify({ msg: 'User is not authenticated' }), { status: 401 });
    }

    // Parse the tokens from the cookie
    const tokens = JSON.parse(tokenCookie.value);

    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const body = await req.json();

    // Validate required fields
    if (!body.summary || !body.start || !body.end) {
      return new Response(
        JSON.stringify({ msg: 'Missing required fields' }), 
        { status: 400 }
      );
    }

    // Format dates properly for Google Calendar API
    const startDateTime = new Date(body.start.dateTime).toISOString();
    const endDateTime = new Date(body.end.dateTime).toISOString();

    // Validate attendees format
    const attendees = body.attendees?.filter(attendee => attendee.email?.trim()) || [];

    // Construct the event object
    const eventData = {
      summary: body.summary,
      description: body.description || '',
      start: {
        dateTime: startDateTime,
        timeZone: body.start.timeZone || 'Asia/Kolkata',
      },
      end: {
        dateTime: endDateTime,
        timeZone: body.end.timeZone || 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      attendees: attendees,
    };

    console.log('Sending event data to Google Calendar:', eventData);

    const event = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: eventData,
    });

    return new Response(
      JSON.stringify({ 
        msg: 'Event created successfully!', 
        event: event.data 
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Detailed error:', error);
    
    // Return more specific error messages
    const errorMessage = error.message || 'Failed to create event';
    const errorStatus = error.code || 500;
    
    return new Response(
      JSON.stringify({ 
        msg: errorMessage,
        details: error.errors || [] 
      }), 
      { status: errorStatus }
    );
  }
}