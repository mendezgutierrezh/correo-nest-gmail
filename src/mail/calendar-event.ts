/*
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function authorize(): Promise<OAuth2Client> {
  const credentialsPath = path.join(process.cwd(), "credentials.json");
  if (!fs.existsSync(credentialsPath)) {
    throw new Error("El archivo credentials.json no existe.");
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

  if (!credentials.web) {
    throw new Error("La estructura del archivo credentials.json es incorrecta.");
  }

  const { client_secret, client_id, redirect_uris } = credentials.web;

  if (!redirect_uris || redirect_uris.length === 0) {
    throw new Error("redirect_uris no está definido en el archivo credentials.json.");
  }

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  } else {
    return getAccessToken(oAuth2Client);
  }
}

function getAccessToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  return new Promise((resolve, reject) => {
    const rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter the code from that page here: ", (code: string) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        resolve(oAuth2Client);
      });
    });
  });
}

export async function createGoogleCalendarEvent() {
  const auth = await authorize();
  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: "Reunión de Proyecto",
    location: "Oficina Principal",
    description: "Revisión del estado del proyecto",
    start: {
      dateTime: "2024-06-20T10:00:00-07:00",
      timeZone: "America/Santiago"
    },
    end: {
      dateTime: "2024-06-20T11:00:00-07:00",
      timeZone: "America/Santiago"
    },
    attendees: [
      { email: "hector.mendez.gutierrez@outlook.com", name: "Mendez" },
      { email: "hectorelectron9@gmail.com", name: "Hector" }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 }
      ]
    },
    conferenceData: {
      createRequest: {
        requestId: "some-random-string",
        conferenceSolutionKey: {
          type: "hangoutsMeet"
        }
      }
    },
    sendUpdates: "all"
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all"
    });
    console.log("Event created: %s", response.data.htmlLink);
    return response.data.htmlLink;
  } catch (error) {
    console.error("Error creating event: ", error);
    throw error;
  }
}
*/

import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function authorize(): Promise<OAuth2Client> {
  const credentialsPath = path.join(process.cwd(), "credentials.json");
  if (!fs.existsSync(credentialsPath)) {
    throw new Error("El archivo credentials.json no existe.");
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

  if (!credentials.web) {
    throw new Error("La estructura del archivo credentials.json es incorrecta.");
  }

  const { client_secret, client_id, redirect_uris } = credentials.web;

  if (!redirect_uris || redirect_uris.length === 0) {
    throw new Error("redirect_uris no está definido en el archivo credentials.json.");
  }

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  } else {
    return getAccessToken(oAuth2Client);
  }
}

function getAccessToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  return new Promise((resolve, reject) => {
    const rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter the code from that page here: ", (code: string) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        resolve(oAuth2Client);
      });
    });
  });
}

export async function createGoogleCalendarEvent() {
  const auth = await authorize();
  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: "Evento de prueba 2",
    location: "Parque Cordillera",
    description: "Prueba de evento google calendar",
    start: {
      dateTime: "2024-06-20T10:00:00-07:00",
      timeZone: "America/Santiago"
    },
    end: {
      dateTime: "2024-06-20T11:00:00-07:00",
      timeZone: "America/Santiago"
    },
    attendees: [
      { email: "hector.mendez.gutierrez@outlook.com", name: "Mendez" },
      { email: "hectortecno2014@gmail.com", name: "Hector" },
      { email: "octavioarr3@gmail.com", name: "Octavio" },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 }
      ]
    },
    conferenceData: {
      createRequest: {
        requestId: "some-random-string",
        conferenceSolutionKey: {
          type: "hangoutsMeet"
        }
      }
    },
    sendUpdates: "all"
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all"
    });
    console.log("Event created: %s", response.data.htmlLink);
    return response.data.htmlLink;
  } catch (error) {
    console.error("Error creating event: ", error);
    throw error;
  }
}
