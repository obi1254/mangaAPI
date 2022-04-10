const cheerio = require('cheerio');
const axios = require('axios');
const getAllMangas = async (req, res) => {
  const mangas = [];
  try {
    const { data } = await axios.get('https://teamx.fun/manga/');
    const $ = cheerio.load(data);
    //grabing the data
    $('.thumb img').each((i, ele) => {
      const img = $(ele).attr('src');
      mangas.push({ img: img });
    });
    $('.thumb h3 a').each((i, ele) => {
      const link = $(ele).attr('href');
      const name = $(ele).text();
      mangas[i].link = link;
      mangas[i].name = name;
    });

    res.json(mangas);
  } catch (error) {
    console.log('error : ', error.message);
  }
};
module.exports = getAllMangas;
