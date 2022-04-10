const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { chapter } = req.params;
  const chapters = [];
  try {
    const { data } = await axios.get(`https://teamx.fun/${chapter}/`);
    const $ = cheerio.load(data);
    $('#translationPageall embed').each((i, ele) => {
      const chapterImg = $(ele).attr('src');
      if (chapterImg) {
        chapters.push(chapterImg);
      }
    });
    res.status(200).json(chapters);
  } catch (error) {
    console.log(error);
  }
};
