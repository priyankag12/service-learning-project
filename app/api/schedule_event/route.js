import { google } from 'googleapis';
import { v4 as uuid } from 'uuid';

export async function GET() {
  return new Response(JSON.stringify({ msg: 'Please use POST to schedule an event' }), { status: 405 });
}

export async function POST(req) {
  try {
    // Set up Google Calendar API client with service account credentials
    const calendar = google.calendar({
      version: 'v3',
      auth: new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/calendar'],
      })
    });

    const body = await req.json();

    // Validate required fields
    if (!body.summary || !body.start || !body.end) {
      return new Response(
        JSON.stringify({ msg: 'Missing required fields' }), 
        { status: 400 }
      );
    }

    // Format dates for Google Calendar API
    const startDateTime = new Date(body.start.dateTime).toISOString();
    const endDateTime = new Date(body.end.dateTime).toISOString();

    // Format and validate attendees
    const attendees = body.attendees?.filter(attendee => attendee.email?.trim()) || [];

    // Construct event object
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