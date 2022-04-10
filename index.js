const cors = require('cors');
const express = require('express');
const getAllManga = require('./controllers/getAllMangas.js');
const getMangaDetails = require('./controllers/getMangaDetails');
const getPics = require('./controllers/GetMangaPics');
/* const cloudinary = require('cloudinary'); */

const port = 7000;
const app = express();
app.use(cors());
app.listen(port, () => {
  console.log(`running on port ${port} `);
});

app.get('/', getAllManga);
app.get('/details/:mangaName', getMangaDetails);
app.get('/details/:mangaName/:chapter', getPics);
