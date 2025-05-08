require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Autenticación con Google
const auth = new google.auth.GoogleAuth({
  keyFile: 'creds.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SHEET_ID = process.env.SHEET_ID;

app.post('/api/confirmacion', async (req, res) => {
  const { nombre, estado } = req.body;

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Hoja 1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toLocaleString(), nombre, estado]],
      },
    });

    res.status(200).json({ mensaje: 'Confirmación guardada' });
  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    res.status(500).json({ mensaje: 'Error al guardar en Sheets' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
