const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
const TOKEN_PATH = 'token.json';

const getFileByAuth = (fileId) => {
  const context = {fileId: fileId};
  const bindGetFileFromDrive = getFileFromDrive.bind(context);

  return new Promise(resolve => {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), bindGetFileFromDrive)
        .then(res => resolve(res));
    });
  });
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  return new Promise(resolve => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client)
        .then(res => resolve(res));
    });
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function getFileFromDrive(auth) {
  const fileId = this.fileId;
  const sheets = google.sheets({version: 'v4', auth});

  return new Promise(resolve => {
    sheets.spreadsheets.get(
      {
        spreadsheetId: fileId,
        range: [],
        includeGridData: true
      },
      (err, res) => {
        if (err) console.log(err);
        else resolve(res);
      }
    );
  });
}

module.exports = getFileByAuth;
